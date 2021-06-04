//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


//factory constructor to create a sale contract
contract SaleFactory {
    address[] public sales;


    function createSale(address _itemTokenAddress, uint256 _item, uint256 price) public {
        address newSale = address(new Sale(msg.sender, _itemTokenAddress, _item, price));
        sales.push(newSale);
    }

    function getSales() public view returns (address[]memory) {
        return sales;
    }
}

contract Sale {
    
    
    event TradeStatusChange(uint256 ad, bytes32 status);
    
    IERC721 itemToken;
    address payable public poster;
    address public buyer;
    address public itemTokenAddress;
    uint256 public item;
    uint256 public price;
    uint public payment;
    bool public purchaser;
    bytes32 public status; // Pending, Open, Locked, Executed, Cancelled
    
    /**
     * @dev Opens a new trade. Puts _item in escrow.
     * @param _itemTokenAddress The token's contract.
     * @param _item The id for the item to trade.
     * @param _price The amount of currency for which to trade the item.
     */

    constructor(address payable _poster, address _itemTokenAddress, uint256 _item, uint256 _price) {
        itemToken = IERC721(_itemTokenAddress);
        itemTokenAddress = _itemTokenAddress;
        poster = _poster;
        item = _item;
        price = _price;
        status = "Pending";
    }
    
    /**
     * @dev Opens a new trade. Puts item in escrow.
     */
     
    function openTrade() public virtual{
            require(status == "Pending", "Trade is not openable."); 
             status = "Open";
             purchaser = false;
             itemToken.transferFrom(msg.sender, address(this), item);
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
            uint256,
            uint256,
            bytes32
        )
    {
        return (
            poster,
            itemTokenAddress,
            item,
            price,
            status
        );
    }


    function purchaseToken() public payable virtual {
        require(status == "Open", "Trade is not Open.");
        require(msg.value >= price, "Payment must meet or exceed asking price.");
        require(purchaser == false, "Item is no longer available");
        purchaser = true;
        payment = msg.value;
        status = "Locked";
        buyer = msg.sender;
        emit TradeStatusChange(item, "Locked");
        executeTrade();
    } 
    /**
     * @dev Executes a trade. Must have approved this contract to transfer the
     * amount of currency specified to the poster. Transfers ownership of the
     * item to the filler.
     */

    function executeTrade() private {
        require(status == "Locked", "Trade is not locked in.");
        itemToken.safeTransferFrom(address(this), buyer, item);
        poster.transfer(payment);
        status = "Executed";
        emit TradeStatusChange(item, "Executed");
    }

    /**
     * @dev Cancels an Open trade by the poster. (Trade was cancelled before a purchaser could purchase.)
     */
    function cancelTrade() public virtual {
        require(status == "Open", "Trade is not Open.");
        status = "Cancelled";
        itemToken.safeTransferFrom(address(this), poster, item);
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
