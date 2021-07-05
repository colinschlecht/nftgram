import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../actions/";
import { Segment, Input, Label, Icon } from "semantic-ui-react";

import ImageContainer from "../Art/ImageContainer";

const OpenSaleModal = () => {
  console.log("hi");
  const dispatch = useDispatch();
  const arts = useSelector((state) => state.art.arts);
  const [art, setArt] = useState(arts.length > 0 ? arts[0] : {});

  const handleCancel = (e) => {
    e.preventDefault();
    document.body.classList.remove("modal-open");
    dispatch(closeModal());
  };

  const handleConfirm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setArt(arts[0]);
  }, [arts]);

  return (
    <>
      <Segment attached="top" className="modal-cap ui block header">
        <span className="modal-title"> New Listing </span>
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
            <span className="modal-title">Set Price</span>
          </Segment>
          <Segment attached="bottom" className="modal-price-form body">
            <Input
              labelPosition="right"
              type="number"
              placeholder="Amount in ETH"
              className="sale-value-input"
            >
              <Label basic id="modal-price-label">
                <Icon name="ethereum" id="modal-price-logo"></Icon>
              </Label>
              <input />
              <Label id="modal-price-logo">ETH</Label>
            </Input>
          </Segment>
        </div>
        <div className="modal-price-form buttons-area">
            <a href="cancel-listing" onClick={(e) => handleCancel(e)}>
              <Icon name="cancel" />
              cancel
            </a>

            <a href="confirm-listing" onClick={(e) => handleConfirm(e)}>
              <Icon name="tags" className="confirm" />
              list
            </a>
          </div>
      </Segment>
    </>
  );
};

export default OpenSaleModal;
