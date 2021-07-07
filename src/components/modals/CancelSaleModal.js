import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, raiseAlert, lowerAlert, updateArt } from "../../actions/";
import { Segment, Icon, Button } from "semantic-ui-react";
import { cancel } from "../../utils/SaleInteract";
import ImageContainer from "../Art/ImageContainer";
import ModalPlaceholder from "./ModalPlaceholder";

const CancelSaleModal = () => {
  console.log("hi");
  const dispatch = useDispatch();

  const arts = useSelector((state) => state.art.arts);
  const saleContract = useSelector((state) => state.art.arts);


  const [art, setArt] = useState(arts.length > 0 ? arts[0] : {});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    //function call to cancel sale
    const status = await cancel(saleContract);
    //process cancellation until transaction is mined
    cancelProcessing(status.transactionHash);
  };

  const cancelProcessing = async () => {
    document.body.classList.remove("modal-open");
    dispatch(closeModal());
  };

  const cancelCancel = () => {
    document.body.classList.remove("modal-open");
    dispatch(closeModal());
  };

  useEffect(() => {
    setArt(arts[0]);
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
              disabled={disabled}
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
