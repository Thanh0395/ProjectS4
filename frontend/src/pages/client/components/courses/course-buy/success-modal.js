// SuccessModal.js
import React from "react";
import Modal from "react-modal";

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="p-5 text-center">
        <h2>Success!</h2>
        <p>Purchase successful! Congratulations!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
