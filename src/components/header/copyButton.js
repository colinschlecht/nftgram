import React from "react";
import { Icon } from "semantic-ui-react";

const CopyButton = ({ message }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <>
      &nbsp;&nbsp;
      <Icon link className="copy outline" onClick={() => copyToClipboard()} />
    </>
  );
};

export default CopyButton;
