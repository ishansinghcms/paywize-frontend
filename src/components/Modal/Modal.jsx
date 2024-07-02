import React from "react";
import classes from "./style.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.modalOverlay} onClick={handleOverlayClick}>
      <div className={classes.modalContent}>
        {children}
        <button onClick={onClose} className={classes.modalCloseButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
