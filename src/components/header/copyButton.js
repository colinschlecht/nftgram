import React from "react";
import { Icon } from "semantic-ui-react";
import { CopyMessage } from "./CopyMessage";

const CopyButton = ({ message }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    return <CopyMessage />;
  };

  return (
    <>
      &nbsp;&nbsp;
      <Icon link className="copy outline" onClick={() => copyToClipboard()} />
    </>
  );
};

export default CopyButton;
