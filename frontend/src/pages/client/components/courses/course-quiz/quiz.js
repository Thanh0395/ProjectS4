import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Row } from "react-bootstrap";
import "./quiz.css";
import axios from "axios";

const QuizApp = (props) => {
  const { course, user, question } = props;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    new Array(course?.questions?.length || 0).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1 * 60);
  const [responseData, setResponseData] = useState(null);
  const handleOptionChange = (selectedOption) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedUserAnswers);
  };
  // handle start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };
  // handle next click
  const handleNextClick = () => {
    if (currentQuestion < course.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  // handle previous click
  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  // handle reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(course.questions.length).fill(null));
    setShowResults(false);
    setQuizStarted(false);
  };

  const unansweredCount = userAnswers.filter(
    (answer) => answer === null
  ).length;
  const handleConfirmFinish = async () => {
    // Dynamically generate userSubmission based on user answers
    const userSubmission = userAnswers.map((answer, index) => ({
      questionId: course.questions[index].questionId,
      answer: answer,
    }));

    // Convert the array to JSON string
    const data = JSON.stringify(userSubmission);
    // Send user answers to the server
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/project4/thanh/test-result/${user.userId}/${question}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      axios
        .request(config)
        .then((response) => {
          setResponseData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      // Log the server response
    } catch (error) {
      console.error("Error sending answers:", error);
    }

    setShowResults(true);
    setShowConfirmModal(false);
  };
  const handleFinishClick = () => {
    setShowConfirmModal(true);
  };
  const handleCancelFinish = () => {
    setShowConfirmModal(false);
  };

  const handleQuestionChange = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  // const formatTime = (timeInSeconds) => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  return (
    <div
      className={`quiz container border mt-5 ${
        course.video === null ? "d-none" : ""
      }`}
    >
      {!quizStarted ? (
        <div className="quiz-start-test">
          <h2 className="text-success">Welcome to the Quiz!</h2>
          <p>
            This quiz will test your knowledge on various topics. Each question
            has multiple-choice options. Click{" "}
            <button onClick={handleStartQuiz} className="btn btn-success">
              Start
            </button>{" "}
            when you are ready to begin.
          </p>
        </div>
      ) : showResults ? (
        <div>
          <ul>
            <div>
              <h2 className="text-success">Quiz Results</h2>
              {/* ... (existing code) */}
              {responseData && (
                <div>
                  <p className="text-danger">
                    Total Answer: {course.questions.length - unansweredCount} /{" "}
                    {course.questions.length}
                  </p>
                  <p>
                    Result:{" "}
                    {responseData.passed ? (
                      <span className="text-success">Passed</span>
                    ) : (
                      <span className="text-danger">Fail</span>
                    )}
                  </p>
                  {/* <p>Achievements: {responseData.achievements ?  (responseData.achievements) :  ("-")}</p> */}
                  <p>Total Answers: {responseData.totalAnswer ?  (responseData.totalAnswer) : ("-")}</p>
                  <p>Correct Answers: {responseData.correctAnswer ?  (responseData.correctAnswer) : ("-")}</p>
                  <p>Gain Gems: {responseData.gainGem ?  (responseData.gainGem) : ("-")}</p>
                  <p>Old Level: {responseData.oldLevel ?  (responseData.oldLevel) : ("-")}</p>
                  <p>New Level: {responseData.newLevel ?  (responseData.newLevel) : ("-")}</p>
                  <p>Old Experience: {responseData.oldExp ?  (responseData.oldExp) : ("-")}</p>
                  <p>New Experience: {responseData.newExp ?  (responseData.newExp) : ("-")}</p>
                  <p>Result Message: {responseData.resultMessage ?  (responseData.resultMessage) : ("-")}</p>
                </div>
              )}
              <button className="btn btn-primary" onClick={resetQuiz}>
                Restart Quiz
              </button>
            </div>
          </ul>
        </div>
      ) : (
        <div className="quiz-question">
          <div className="timer">
            {quizStarted && !showResults && (
              <p className="text-danger">
                {/* Time Remaining: {formatTime(remainingTime)} */}
              </p>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-center justify-content-center position-relative">
              {course.questions.map((question, index) => (
                <div key={index} className="px-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`question_${index}`}
                    name="question_selection"
                    value={index}
                    checked={currentQuestion === index}
                    onChange={() => handleQuestionChange(index)}
                  />
                  <label
                    htmlFor={`question_${index}`}
                    className="form-check-label px-2"
                  >
                    {index + 1}
                  </label>
                </div>
              ))}
            </div>
            <>
              <button
                className="btn btn-outline-primary"
                onClick={handleFinishClick}
              >
                Finish
              </button>
              <Modal show={showConfirmModal} onHide={handleCancelFinish}>
                <Modal.Header closeButton>
                  <Modal.Title>Finish Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to finish the quiz?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCancelFinish}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleConfirmFinish}>
                    Finish
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>

          <Row className="d-flex align-items-center justify-content-center position-relative mt-4 p-4 border-top border-bottom ">
            <div className="col-sm-6 text-start border-end ">
              <h3>Question {currentQuestion + 1}</h3>
              <p>{course.questions[currentQuestion].content}</p>
            </div>
            <div className="col-sm-6 px-sm-5">
              <div className="pt-2">
                <input
                  className=""
                  type="radio"
                  id={course.questions[currentQuestion].answerA}
                  name={`question_${currentQuestion}_selection`}
                  value={"A"}
                  checked={userAnswers[currentQuestion] === "A"}
                  onChange={() => handleOptionChange("A")}
                />
                <label
                  className="px-3"
                  htmlFor={course.questions[currentQuestion].answerA}
                >
                  {course.questions[currentQuestion].answerA}
                </label>
              </div>
              <div className="pt-2">
                <input
                  className=""
                  type="radio"
                  id={course.questions[currentQuestion].answerB}
                  name={`question_${currentQuestion}_selection`}
                  value={"B"}
                  checked={userAnswers[currentQuestion] === "B"}
                  onChange={() => handleOptionChange("B")}
                />
                <label
                  className="px-3"
                  htmlFor={course.questions[currentQuestion].answerB}
                >
                  {course.questions[currentQuestion].answerB}
                </label>
              </div>
              <div className="pt-2">
                <input
                  className=""
                  type="radio"
                  id={course.questions[currentQuestion].answerC}
                  name={`question_${currentQuestion}_selection`}
                  value={"C"}
                  checked={userAnswers[currentQuestion] === "C"}
                  onChange={() => handleOptionChange("C")}
                />
                <label
                  className="px-3"
                  htmlFor={course.questions[currentQuestion].answerC}
                >
                  {course.questions[currentQuestion].answerC}
                </label>
              </div>
              <div className="pt-2">
                <input
                  className=""
                  type="radio"
                  id={course.questions[currentQuestion].answerD}
                  name={`question_${currentQuestion}_selection`}
                  value={"D"}
                  checked={userAnswers[currentQuestion] === "D"}
                  onChange={() => handleOptionChange("D")}
                />
                <label
                  className="px-3"
                  htmlFor={course.questions[currentQuestion].answerD}
                >
                  {course.questions[currentQuestion].answerD}
                </label>
              </div>
            </div>
          </Row>
          <div className="d-flex align-items-center justify-content-center position-relative pt-5">
            <button
              className="text-secondary border-0 bg-transparent cursor-pointer"
              onClick={handlePreviousClick}
            >
              Previous
            </button>
            <button
              className="text-primary border-0 bg-transparent cursor-pointer"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
