import React from "react";
import { Icon, Label } from "semantic-ui-react";

const Tag = ({
  handleShowPrice,
  scenario,
  sale,
  handleCancelSale,
  handlePurchase,
  art,
  handleList,
}) => {
  const renderTag = () => {
    switch (scenario) {
      case "for sale owner":
        return (
          <>
            <a
              href={`/art/show/${art.id}`}
              className="ethereum sale"
              color="green"
              onClick={(e) => handleCancelSale(e)}
            >
              <Icon color="green" name="ethereum" />
              <span>{sale.price} ETH</span>
            </a>
          </>
        );
      case "for sale not owner":
        return (
          <>
            <a
              href={`/art/show/${art.id}`}
              className="ethereum sale"
              color="green"
              onClick={(e) => handlePurchase(e)}
            >
              <Icon color="green" name="ethereum" />
              <span>{sale.price} ETH</span>
            </a>
          </>
        );
      case "not for sale owner":
        return (
          <>
            <a
              href={`/art/show/${art.id}`}
              className="ethereum sale"
              onClick={(e) => handleList(e)}
            >
              <Icon color="red" name="ethereum" />
              <span>0.0 ETH</span>
            </a>
          </>
        );
      default:
        return (
            <>
              <a
                href={`/art/show/${art.id}`}
                className="ethereum sale"
                onClick={(e) => handleShowPrice(e)}
              >
                <Icon color="red" name="ethereum" />
                <span>0.0 ETH</span>
              </a>
            </>
          );
    }
  };
  return (
    <>
      <Label tag className="pricetag" id="pricetag">
        {renderTag()}
      </Label>
    </>
  );
};

export default Tag;
