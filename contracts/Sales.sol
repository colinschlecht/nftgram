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
    
        address public poster;
        address public itemTokenAddress;
        uint256 public item;
        uint256 public price;
        bytes32 public status; // Open, Executed, Cancelled
    

        /**
     * @dev Opens a new trade. Puts _item in escrow.
     * @param _itemTokenAddress The token's contract.
     * @param _item The id for the item to trade.
     * @param _price The amount of currency for which to trade the item.
     */

    constructor(address _poster, address _itemTokenAddress, uint256 _item, uint256 _price) {
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
             itemToken.transferFrom(msg.sender, address(this), item);
             status = "Open";
             
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

    /**
     * @dev Executes a trade. Must have approved this contract to transfer the
     * amount of currency specified to the poster. Transfers ownership of the
     * item to the filler.
     */
    function executeTrade() public payable virtual {
        require(status == "Open", "Trade is not Open.");
        itemToken.safeTransferFrom(address(this), msg.sender, item);
        status = "Executed";
        emit TradeStatusChange(item, "Executed");
    }

    /**
     * @dev Cancels a trade by the poster.
     */
    function cancelTrade() public virtual {
        require(status == "Open" || status == "Pending", "Trade is not Open.");
        itemToken.safeTransferFrom(address(this), poster, item);
        status = "Cancelled";
        emit TradeStatusChange(item, "Cancelled");
    }
}
