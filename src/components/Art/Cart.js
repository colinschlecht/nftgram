import React from "react";
import { Icon } from "semantic-ui-react";

const Cart = ({
  handleShowPrice,
  scenario,
  handleCancelSale,
  handlePurchase,
  art,
  handleList,
}) => {
  const renderCart = () => {
    switch (scenario) {
      case "for sale owner":
        return (
          <span className="cartspan">
            <a
              href={`/art/show/${art.id}`}
              className="ethereum sale shoppingcart"
              onClick={(e) => handleCancelSale(e)}
            >
              <Icon color="red" name="cart" className="shoppingcart" />
            </a>
            <p className="salemessage">Cancel Listing</p>
          </span>
        );
      case "for sale not owner":
        return (
          <span className="cartspan">
            <a
              href={`/art/show/${art.id}`}
              className="ethereum sale shoppingcart"
              onClick={(e) => handlePurchase(e)}
            >
              <Icon color="green" name="cart" className="shoppingcart" />
            </a>
            <p className="salemessage">purchase</p>
          </span>
        );
      case "not for sale owner":
        return (
          <span className="cartspan">
            <a
              href={`/art/show/${art.id}`}
              className="ethereum sale shoppingcart"
              onClick={(e) => handleList(e)}
            >
              <Icon color="red" name="cart" className="shoppingcart" />
            </a>
            <p className="salemessage">Create Listing</p>
          </span>
        );
      default:
        return (
          <span className="cartspan">
            <a
              href={`/art/show/${art.id}`}
              className="ethereum sale shoppingcart"
              onClick={(e) => handleShowPrice(e)}
            >
              <Icon color="red" name="cart" className="shoppingcart" />
            </a>
            <p className="salemessage">Not for sale</p>
          </span>
        );
    }
  };
  return <>{renderCart()}</>;
};

export default Cart;
