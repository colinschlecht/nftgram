import React from "react";
import OpenSaleModal from "./OpenSaleModal";
import CancelSaleModal from "./CancelSaleModal";
import { useDispatch } from "react-redux";
import { closeModal } from "../../actions/";

const OpenModal = ({ modal }) => {
  const dispatch = useDispatch();

  const handleCancel = (e) => {
    e.preventDefault();
    document.body.classList.remove('modal-open'); 
    dispatch(closeModal());
  };

  const renderModal = () => {
    document.body.classList.add('modal-open');
    switch (modal.type) {
      case "open sale":
        return <OpenSaleModal modal={modal} />;
      case "cancel sale":
        return <CancelSaleModal modal={modal} />;
      default:
        console.log("no modal rendered");
        break;
    }
  };

  return (
    <div id="modal-background" onClick={(e) => handleCancel(e)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {renderModal()}
      </div>
    </div>
  );
};

export default OpenModal;
