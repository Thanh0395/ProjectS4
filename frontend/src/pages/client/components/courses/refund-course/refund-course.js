import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "./refund.css";
const AnnouncementModal = ({ show, message, onHide }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onHide();
    }, 2000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout when the component unmounts or when modal is hidden
  }, [show, onHide]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="d-flex justify-content-center"
    >
      <Modal.Header className="bg-danger d-flex justify-content-center">
        <Modal.Title>Announcement</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};
const RefundCourse = (props) => {
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const handleShowRefundModal = () => {
    setShowRefundModal(true);
  };
  const handleCancelShowRefundModal = () => {
    setShowRefundModal(false);
  };
  const handleHideModal = () => {
    setShowModal(false);
    setAnnouncement("");
  };
  const handleRefundClick = async () => {
    const { lesson } = props;
    const getToken = () => {
      const token = JSON.parse(localStorage.getItem("token"));
      return token;
    };
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/api/project4/thanh/payment/refund-lesson/${lesson}`,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      };
      const response = await axios.request(config);
      setShowModal(true);
      setAnnouncement(response.data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setShowModal(true);
      setAnnouncement(error.response.data);
    }
  };
  return (
    <>
      <button onClick={handleShowRefundModal} className="btn btn-secondary">
        Refund Course
      </button>
      <Modal
        show={showRefundModal}
        onHide={handleCancelShowRefundModal}
        centered
      >
        <Modal.Header closeButton className="bg-success">
          <Modal.Title className="p-3"></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h6>Are you sure you want to make refund this course? </h6>
          <p className="text-danger fs-6">
            <i class="bi bi-exclamation-triangle pe-3"></i>"If the course has
            been refunded once time, that is not allowed"
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelShowRefundModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleRefundClick}>
            Refund
            <AnnouncementModal
              show={showModal}
              message={announcement}
              onHide={handleHideModal}
            />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RefundCourse;
