import { useState , useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const CourseComment = (props) => {
  const { lesson, user } = props;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModalContent, setShowErrorModalContent] = useState();

  const handleCommentClick = () => {
    setShowConfirmModal(true);
  };

  const handleCancelFinish = () => {
    setShowConfirmModal(false);
  };

  const handleCommentFinish = async () => {
    try {
      const commentText = document.getElementById("comment").value;
        console.log(commentText)
      const config = {
        method: "post",
        url: `http://localhost:8080/api/project4/thanh/lesson/comment/${user}/${lesson}`,
        data: { content: commentText },
      };

      await axios.request(config);
      
     // Handle the confirmation logic here
      setShowConfirmModal(false); // Close the modal after finishing
      window.location.reload();
    } catch (error) {
      setShowErrorModalContent("Error adding comment");
    }
  };
 
  return (
    <>
      <button onClick={handleCommentClick} className="btn btn-outline-danger">
        Leave your comment
      </button>
      <Modal show={showConfirmModal} onHide={handleCancelFinish}>
        <Modal.Header closeButton>
          <Modal.Title>Leave your comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="comment-modal-lable mb-3">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea
              name="content"
              className="form-control"
              id="comment"
              rows="3"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelFinish}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCommentFinish}>
            Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourseComment;
