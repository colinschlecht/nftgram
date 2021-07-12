import React, { useState } from "react";
import OpenSaleModal from "./OpenSaleModal";
import CancelSaleModal from "./CancelSaleModal";
import Purchase from "./Purchase";
import { useDispatch } from "react-redux";
import { closeModal } from "../../actions/";

const OpenModal = ({ modal }) => {
  const dispatch = useDispatch();

  const [locked, setLocked] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    document.body.classList.remove("modal-open");
    dispatch(closeModal());
  };


  const renderModal = () => {
    document.body.classList.add("modal-open");
    switch (modal.type) {
      case "open sale":
        return <OpenSaleModal modal={modal} setLocked={setLocked}/>;
      case "cancel sale":
        return <CancelSaleModal modal={modal} setLocked={setLocked}/>;
      case "purchase":
        return <Purchase modal={modal} setLocked={setLocked}/>;
      default:
        document.body.classList.remove("modal-open");
        break;
    }
  };

  return (
    <div
      id="modal-background"
      onClick={!locked ? (e) => handleCancel(e) : null}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {renderModal()}
      </div>
    </div>
  );
};

export default OpenModal;
