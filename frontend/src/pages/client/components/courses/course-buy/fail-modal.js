// SuccessModal.js
import React from "react";
import Modal from "react-modal";

const FailModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="p-5 text-center">
        <h2>Fail!</h2>
        <p>Purchase successful! Congratulations!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default FailModal;
