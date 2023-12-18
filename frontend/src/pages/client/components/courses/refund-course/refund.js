import axios from "axios";
import { React, useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";

const RefundCourse = (props) => {
  const { lesson } = props;
  // eslint-disable-next-line no-undef
  const [errorMessage, setErrorMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCancelShowModal = () => {
    setShowModal(false);
  };
  const handleShowMessage = () =>{
    setShowModalMessage(true)
  }
  const handleShowSuccessModal = ()=>{
    setShowSuccessModal(false)
  }
  useEffect(() => {
    if (showSuccessModal) {
      const timeoutId = setTimeout(() => {
        setShowSuccessModal(false);
        window.location.reload();
      }, 2000); // 4 seconds in milliseconds

      return () => clearTimeout(timeoutId); // Cleanup the timeout when the component unmounts or when modal is hidden
    }
  }, [showSuccessModal]);
  useEffect(() => {
    if (showModalMessage) {
      const timeoutId = setTimeout(() => {
        setShowModalMessage(false)
      }, 2000); // 4 seconds in milliseconds

      return () => clearTimeout(timeoutId); // Cleanup the timeout when the component unmounts or when modal is hidden
    }
  }, [showModalMessage]);
  const handleRefund = async () => {
    try {
      const getToken = () => {
        const token = JSON.parse(localStorage.getItem("token"));
        return token;
      };
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/api/project4/thanh/payment/refund-lesson/${lesson}`,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      };
      const response = await axios.request(config);
      setErrorMessage(response.data);
      handleShowSuccessModal()
    } catch (error) {
      setErrorMessage(error.response.data);
      setShowModal(false);
      handleShowMessage()
    }
  };

  return (
    <>
      <div>
        <button onClick={handleShowModal} className="btn btn-warning">
          REFUND COURSE
        </button>
        <Modal
          className="course-buy_confirm"
          show={showModal}
          onHide={handleCancelShowModal}
        >
          <Modal.Header closeButton className="bg-success">
            <Modal.Title className="p-3"></Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            Are you sure you want to make refund this course?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelShowModal}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleRefund}>
              Refund Course
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          className="course-buy_confirm"
          show={showModalMessage}
          onHide={handleCancelShowModal}
        >
          <Modal.Header  className="bg-success">
            <Modal.Title className="p-3"></Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
           {errorMessage}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <Modal
          className="course-buy_confirm"
          show={showSuccessModal}
        >
          <Modal.Header  className="bg-success">
            <Modal.Title className="p-3"></Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <p>You got the refund</p>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default RefundCourse;
