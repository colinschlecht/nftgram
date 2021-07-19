import React from "react";
import { closeModal } from "../../actions/";
import { useDispatch } from "react-redux";
import { Segment, Button, Icon } from "semantic-ui-react";
const BrowserWarning = () => {
  const dispatch = useDispatch();

  console.log("");

  const cancelCancel = () => {
    dispatch(closeModal());
    document.body.classList.remove("modal-open");
  };
  return (
    <>
      <Segment attached="top" className="modal-cap ui block header">
        <span className="modal-title"> </span>
      </Segment>
      <Segment attached="bottom" className="modal-body" id="modal-card">
        <div className="modal-content-image-segs">
          <Segment
            className="image-holder title-seg ui block header modal-cap"
            attached="top"
          >
            <span className="modal-title">Mobile Browser Detected</span>
          </Segment>
          <Segment attached className="image-holder outer-seg">
            <p className="warning-text-mobile">
              Hello There!
              <br></br>
              <br></br>
              This site is intended for use in a desktop browser, and relies
              on the MetaMask web extension.
              <br></br>
              <br></br>
              If you wish to continue on a mobile device, you will be unable to
              interract as you would on a desktop browser at this time.
              <br></br>
              <br></br>
              Thank you for your patience while we experiment with integrating
              the MetaMask mobile crypto wallet!
            </p>
          </Segment>
          <Segment
            attached="bottom"
            className="image-holder footer-seg ui block header modal-cap"
          >
            <span className="modal-title"></span>
          </Segment>
        </div>
        <div className="modal-price-form segment-container">
          <Segment
            attached="top"
            className="ui block header modal-price-form heading modal-cap"
          >
            <span className="modal-title">Continue Anyway</span>
          </Segment>

          <Segment attached="bottom" className="modal-price-form body">
            <Button
              positive
              icon
              labelPosition="left"
              onClick={(e) => cancelCancel(e)}
            >
              <Icon name="check" />
              Okay
            </Button>
          </Segment>
        </div>
        <div className="modal-price-form buttons-area"></div>
      </Segment>
    </>
  );
};

export default BrowserWarning;
