import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../actions/";
import { Segment, Input, Label, Icon, Button } from "semantic-ui-react";
import { create, saleContractAddress } from "../../utils/SFInteract";
import { approveSContractInteraction } from "../../utils/NFTInteract";
import { open } from "../../utils/SaleInteract"
import web3 from "../../utils/web3";
import ImageContainer from "../Art/ImageContainer";

const OpenSaleModal = () => {
  console.log("hi");
  const dispatch = useDispatch();
  const arts = useSelector((state) => state.art.arts);
  const [art, setArt] = useState(arts.length > 0 ? arts[0] : {});
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(false);
  const [saleContract, setSaleContract] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();
    document.body.classList.remove("modal-open");
    dispatch(closeModal());
  };

  const handleList = async (e) => {
    e.preventDefault();
    setCancelDisabled(true);
    setDisabled(true);
    setLoading(true);
    const priceInWei = web3.utils.toWei(price, "ether");
    //creates sales contract from SFactory
    const resp = await create(art.contract_address, art.tokenID, priceInWei);
    //gets sale contract from event log in txhash
    getSaleContract(resp.transactionHash);
  };

  const getSaleContract = async (txHash) => {
    const transaction = await saleContractAddress(txHash);
    if (!transaction) {
      window.setTimeout(async () => {
        await getSaleContract(txHash);
      }, 3000);
    } else {
      console.log(transaction.logs[0]);
      //sets state of sales contract for ref
      setSaleContract(transaction.logs[0].address);
      //TODO error handling for canceling approval of transfer to escrow:
      try {
        //approves interraction of sales contract with NFT
        await approveSContractInteraction(
          transaction.logs[0].address,
          art.tokenID
        );
        setApproved(true);
      } catch (error) {
        setDisabled(false);
        setCancelDisabled(false);
        setApproved(false);
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault()
    open(saleContract)
  }

  useEffect(() => {
    setArt(arts[0]);
  }, [arts]);

  const handleChange = (e, value) => {
    e.preventDefault();
    setPrice(value);
    if (value > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

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
              onChange={(e) => handleChange(e, e.target.value)}
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
          {approved ? (
            <Button
              icon
              labelPosition="left"
              disabled={disabled}
              onClick={(e) => handleConfirm(e)}
            >
              <Icon name="check" />
              confirm
            </Button>
          ) : (
            <>
              <Button
                icon
                labelPosition="left"
                disabled={cancelDisabled}
                onClick={(e) => handleCancel(e)}
              >
                <Icon name="cancel" />
                cancel
              </Button>
              <Button
                loading={loading}
                disabled={disabled}
                icon
                labelPosition="left"
                onClick={(e) => handleList(e)}
              >
                <Icon name="tags" className="confirm" />
                list
              </Button>
            </>
          )}
        </div>
      </Segment>
    </>
  );
};

export default OpenSaleModal;
