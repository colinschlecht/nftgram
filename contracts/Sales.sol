//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

//factory constructor to create a sale contract
contract SaleFactory {
    address[] public sales;

    struct Trade {
        address sale;
        address poster;
        address itemTokenAddress;
        uint256 item;
        uint256 price;
        bytes32 status;
    }

    Trade[] public trades;

    function createSale(
        address _itemTokenAddress,
        uint256 _item,
        uint256 price
    ) public {
        address newSale = address(
            new Sale(msg.sender, _itemTokenAddress, _item, price)
        );
        sales.push(newSale);
    }

    function addStruct(
        address _address,
        address _poster,
        address _itemTokenAddress,
        uint256 _item,
        uint256 _price,
        bytes32 _status
    ) external {
        Trade memory newtrade = Trade({
            sale: _address,
            poster: _poster,
            itemTokenAddress: _itemTokenAddress,
            item: _item,
            price: _price,
            status: _status
        });
        trades.push(newtrade);
    }

    function getSales() public view returns (address[] memory) {
        return sales;
    }

    function getSalesDetailed() public view returns (Trade[] memory) {
        return trades;
    }
}

contract Sale {
    event TradeStatusChange(uint256 ad, bytes32 status);
    event ContractCreated(address ad);

    IERC721 itemToken;
    address public parent;
    address payable public poster;
    address public buyer;
    address public itemTokenAddress;
    uint256 public item;
    uint256 public price;
    uint256 public payment;
    bool public purchaser;
    bytes32 public status; // Pending, Open, Locked, Executed, Cancelled

    /**
     * @dev Opens a new trade. Puts _item in escrow.
     * @param _itemTokenAddress The token's contract.
     * @param _item The id for the item to trade.
     * @param _price The amount of currency for which to trade the item.
     */

    constructor(
        address payable _poster,
        address _itemTokenAddress,
        uint256 _item,
        uint256 _price
    ) {
        parent = msg.sender;
        itemToken = IERC721(_itemTokenAddress);
        itemTokenAddress = _itemTokenAddress;
        poster = _poster;
        item = _item;
        price = _price;
        status = "Pending";
        emit ContractCreated(address(this));
    }

    /**
     * @dev Opens a new trade. Puts item in escrow.
     */

    function openTrade() public virtual {
        require(status == "Pending", "Trade is not openable.");
        status = "Open";
        purchaser = false;
        itemToken.transferFrom(msg.sender, address(this), item);
        SaleFactory(parent).addStruct(
            address(this),
            poster,
            itemTokenAddress,
            item,
            price,
            status
        );
        emit TradeStatusChange(item, "Open");
    }

    /**
     * @dev Returns the details for a trade.
     */
    function getSummary()
        public
        view
        virtual
        returns (
            address,
            address,
            address,
            uint256,
            uint256,
            bytes32,
            address
        )
    {
        return (
            address(this),
            poster,
            itemTokenAddress,
            item,
            price,
            status,
            buyer
        );
    }

    /**
     * @dev Engages the execution of a trade. Transfers funds to the contract.
     */

    function purchaseToken() public payable virtual {
        require(status == "Open", "Trade is not Open.");
        require(
            msg.value >= price,
            "Payment must meet or exceed asking price."
        );
        require(purchaser == false, "Item is no longer available");
        purchaser = true;
        payment = msg.value;
        status = "Locked";
        buyer = msg.sender;
        SaleFactory(parent).addStruct(
            address(this),
            poster,
            itemTokenAddress,
            item,
            price,
            status
        );
        emit TradeStatusChange(item, "Locked");
        executeTrade();
    }

    /**
     * @dev Executes a trade. Transfers ownership of the
     * item to the buyer.
     */

    function executeTrade() private {
        require(status == "Locked", "Trade is not locked in.");
        itemToken.safeTransferFrom(address(this), buyer, item);
        poster.transfer(payment);
        status = "Executed";
        SaleFactory(parent).addStruct(
            address(this),
            poster,
            itemTokenAddress,
            item,
            price,
            status
        );
        emit TradeStatusChange(item, "Executed");
    }

    /**
     * @dev Cancels an Open trade by the poster. (Trade was cancelled before a buyer could purchase.)
     */
    function cancelTrade() public virtual {
        require(status == "Open", "Trade is not Open.");
        status = "Cancelled";
        itemToken.safeTransferFrom(address(this), poster, item);
        SaleFactory(parent).addStruct(
            address(this),
            poster,
            itemTokenAddress,
            item,
            price,
            status
        );

        emit TradeStatusChange(item, "Cancelled");
    }

    /**
     * @dev Cancels a Pending trade by the poster. (Trade has yet to be confirmed.)
     */
    function cancelPending() public virtual {
        require(status == "Pending", "Trade is not Pending.");
        status = "Cancelled";
        emit TradeStatusChange(item, "Cancelled");
    }
}
