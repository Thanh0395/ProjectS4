import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Row } from "react-bootstrap";
import "./quiz.css";

const questions = [
  {
    id: 4,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 5,
    text: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 6,
    text: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1931"],
    correctAnswer: "1912",
  },
  {
    id: 7,
    text: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    id: 8,
    text: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Vietnam"],
    correctAnswer: "Japan",
  },
  {
    id: 9,
    text: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
  },
  {
    id: 10,
    text: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Iron", "Silver"],
    correctAnswer: "Oxygen",
  },
  {
    id: 11,
    text: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Claude Monet",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    id: 12,
    text: "What is the currency of Brazil?",
    options: ["Peso", "Rupee", "Real", "Dollar"],
    correctAnswer: "Real",
  },
  {
    id: 13,
    text: "Which gas makes up the majority of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Nitrogen",
  },
  // Add more questions as needed
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1 * 60);
  const handleOptionChange = (selectedOption) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedUserAnswers);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setScore(0);
    setQuizStarted(false);
  };

  const handleFinishClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmFinish = () => {
    calculateScore();
    setShowResults(true);
    setShowConfirmModal(false);
  };

  const handleCancelFinish = () => {
    setShowConfirmModal(false);
  };

  const handleQuestionChange = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };
  useEffect(() => {
    let timer;
    if (quizStarted && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      handleConfirmFinish(); // Auto-submit quiz when time runs out
    }

    return () => {
      clearInterval(timer);
    };
  }, [handleConfirmFinish, quizStarted, remainingTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="quiz container border mt-5">
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
          <h2 className="text-success">Quiz Results</h2>
          <p className="text-danger">
            Your Score: {score} / {questions.length}
          </p>
          <ul>
            {questions.map((question, index) => (
              <li key={question.id}>
                {question.text} - Your Answer: {userAnswers[index]}
                {userAnswers[index] === question.correctAnswer ? (
                  <span className="text-success">
                    (Correct Answer: {question.correctAnswer})
                  </span>
                ) : (
                  <span className="text-danger">
                    (Correct Answer: {question.correctAnswer})
                  </span>
                )}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary" onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-question">
          <div className="timer">
            {quizStarted && !showResults && (
              <p className="text-danger">
                Time Remaining: {formatTime(remainingTime)}
              </p>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-center justify-content-center position-relative">
              {questions.map((question, index) => (
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
              <p>{questions[currentQuestion].text}</p>
            </div>
            <div className="col-sm-6 px-sm-5">
              {questions[currentQuestion].options.map((option) => (
                <div key={option} className="pt-2">
                  <input
                    className=""
                    type="radio"
                    id={option}
                    name="options"
                    value={option}
                    checked={userAnswers[currentQuestion] === option}
                    onChange={() => handleOptionChange(option)}
                  />
                  <label className="px-3" htmlFor={option}>
                    {option}
                  </label>
                </div>
              ))}
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
