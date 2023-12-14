import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "./course-buy.css";
function CourseBuy(props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalContent, setShowErrorModalContent] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessModalContent, setShowSuccessModalContent] = useState();
  const getToken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    return token;
  };

  const handleButtonClick = async () => {
    try {
      const { lesson } = props;
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/api/project4/thanh/payment/buy-lesson/${lesson}`,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      };

      const response = await axios.request(config);
      console.log(response)
      if (response.status === 200) {
        setShowConfirmModal(false);
        setShowErrorModal(false);
        setShowSuccessModal(true);
        setShowSuccessModalContent(response);
      } else {
        setShowErrorModal();
        setShowErrorModal(true);
      }
    } catch (error) {
      setShowErrorModalContent("Having error buying Course");
      setShowConfirmModal(false);
      setShowErrorModal(true);
    }
  };

  const handleFinishClick = () => {
    setShowConfirmModal(true);
  };

  const handleCancelFinish = () => {
    setShowConfirmModal(false);
    setShowErrorModal(false);
  };

  const handleBuyCourse = () => {
    handleButtonClick();
  };
  useEffect(() => {
    if (showErrorModal || showSuccessModal) {
      const timeoutId = setTimeout(() => {
        setShowConfirmModal(false);
        setShowErrorModal(false);
        setShowSuccessModal(false);
        window.location.reload();
      }, 2000); // 4 seconds in milliseconds

      return () => clearTimeout(timeoutId); // Cleanup the timeout when the component unmounts or when modal is hidden
    }
  }, [showErrorModal, showSuccessModal]);

  return (
    <div className="course-buy">
      <button onClick={handleFinishClick}>Let's Get the Course</button>
      <Modal
        className="course-buy_confirm"
        show={showConfirmModal}
        onHide={handleCancelFinish}
      >
        <Modal.Header closeButton className="bg-success">
          <Modal.Title>BUYING COURSE</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to buy more lesson?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelFinish}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleBuyCourse}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showErrorModal}
        onHide={handleCancelFinish}
      >
        <Modal.Header closeButton className="p-3 bg-warning"></Modal.Header>
        <Modal.Body>{showErrorModalContent}</Modal.Body>
      </Modal>
      <Modal show={showSuccessModal} onHide={handleCancelFinish}>
        <Modal.Header closeButton className="bg-success"></Modal.Header>
        <Modal.Body>{showSuccessModalContent}</Modal.Body>
      </Modal>
    </div>
  );
}

export default CourseBuy;
