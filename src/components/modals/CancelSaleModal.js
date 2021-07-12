import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, raiseAlert, lowerAlert, updateArt } from "../../actions/";
import { Segment, Icon, Button } from "semantic-ui-react";
import { cancel } from "../../utils/SaleInteract";
import ImageContainer from "../Art/ImageContainer";
import ModalPlaceholder from "./ModalPlaceholder";

import { getTransaction } from "../../utils/web3";

const CancelSaleModal = ({ setLocked }) => {
  const dispatch = useDispatch();

  const arts = useSelector((state) => state.art.arts);
  const sale = useSelector((state) => state.sales.sale);
  const [art, setArt] = useState(arts.length > 0 ? arts[0] : {});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const cancelCancel = () => {
    dispatch(closeModal());
    setDisabled("false");
    document.body.classList.remove("modal-open");
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setLocked(true);
    setLoading(true);
    setDisabled(true);
    //function call to cancel sale
    const status = await cancel(sale.contract);
    //process cancellation until transaction is mined
    cancelProcessing(status.transactionHash);
  };

  const cancelProcessing = async (txHash) => {
    const transaction = await getTransaction(txHash);
    //if transaction has not processed, recursively search again for transaction
    if (!transaction) {
      window.setTimeout(async () => {
        await cancelProcessing(txHash);
      }, 3000);
    } else {
      //if transaction and successful update art and exit modal
      if (transaction.status) {
        dispatch(updateArt(art.id, { for_sale: false }));
        cancelCancel();
        dispatch(raiseAlert("Cancellation Completed"));
        dispatch(lowerAlert());
        setLoading(false);
        setCancelled(true);
      } else {
        setDisabled(true);
        setLoading(false);
        dispatch(raiseAlert("Could not Cancel Sale"));
        dispatch(lowerAlert());
      }
    }
  };

  useEffect(() => {
    setArt(arts[0]);
  }, [arts]);

  useEffect(() => {
    return () => {
      setArt("");
      
    };
  }, [arts]);

  return art ? (
    <>
      <Segment attached="top" className="modal-cap ui block header">
        <span className="modal-title"> Cancel Listing </span>
      </Segment>
      <Segment attached="bottom" className="modal-body" id="modal-card">
        <div className="modal-content-image-segs">
          <Segment
            className="image-holder title-seg ui block header modal-cap"
            attached="top"
          >
            <span className="modal-title"> Item: </span>
          </Segment>
          <Segment attached className="image-holder outer-seg">
            <ImageContainer art={art} location="sale" />
          </Segment>
          <Segment
            attached="bottom"
            className="image-holder footer-seg ui block header modal-cap"
          >
            <span className="modal-title">{art.name}</span>
          </Segment>
        </div>
        <div className="modal-price-form segment-container">
          <Segment
            attached="top"
            className="ui block header modal-price-form heading modal-cap"
          >
            <span className="modal-title">Warning</span>
          </Segment>
          <Segment attached="bottom" className="modal-price-form body">
            <h3>Are you sure you would like to cancel?</h3>
          </Segment>
        </div>
        <div className="modal-price-form buttons-area">
          <>
            <Button
              disabled={disabled || !!!sale.contract}
              negative
              icon
              labelPosition="left"
              onClick={(e) => cancelCancel(e)}
            >
              <Icon name="cancel" />
              NO
            </Button>
            {!cancelled ? (
              <Button
                loading={loading}
                disabled={disabled}
                positive
                icon
                labelPosition="left"
                onClick={(e) => handleCancel(e)}
              >
                <Icon name="check" className="confirm" />
                YES
              </Button>
            ) : (
              <Button
                positive
                loading={loading}
                icon
                labelPosition="left"
                onClick={(e) => handleCancel(e)}
              >
                <Icon name="check" className="confirm" />
                G2G
              </Button>
            )}
          </>
        </div>
      </Segment>
    </>
  ) : (
    <ModalPlaceholder />
  );
};

export default CancelSaleModal;
