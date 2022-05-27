import "./Modal.css";
import { useState } from "react";

const Modal = ({ message, classN }) => {
  const modalContent = message;

  return (
    <>
      <div className={classN}>
        <div className="modal-container">
          <div className="modal-card">
            <div className="modal-title">Error</div>
            <div className="modal-message">{modalContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
