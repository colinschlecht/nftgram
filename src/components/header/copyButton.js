import { raiseAlert, lowerAlert } from "../../actions";
import React from "react";
import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";

const CopyButton = ({ message, mod }) => {
  const dispatch = useDispatch();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    dispatch(raiseAlert("Copied!"));
    dispatch(lowerAlert());
  };

  return (
    <>
      &nbsp;&nbsp;
      <Icon
        link
        className={`copy outline ${mod}`}
        onClick={() => {
          copyToClipboard();
        }}
      />
    </>
  );
};

export default CopyButton;
