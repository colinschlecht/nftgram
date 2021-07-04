import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../actions/";

const OpenSaleModal = () => {
  const dispatch = useDispatch();

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(closeModal());
  };

 
  return (
    <>
      <div className="modal-heading">
        <h1>this is a modal</h1>
      </div>
      <div className="modal-body">
        <h5>this is a modal</h5>
      </div>
      <div className="modal-buttons">
        <button onClick={(e) => handleCancel(e)}>cancel</button>
        <button>place for sale</button>
      </div>
    </>
  );
};

export default OpenSaleModal;
