import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const messages = useSelector((state) => state.UI.messages);
  return (
    <div className="alertbox">
      {messages.map((message) => (
        <div className="message banner">
          <h4 className="message">{message}</h4>
        </div>
      ))}
    </div>
  );
};

export default Alert;
