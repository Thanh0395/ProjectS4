import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Badge, Button, Container, Row, Col } from "react-bootstrap";
import CourseImage from "../../../../../assets/courses-02.jpg";
import Student_Detail from "../../../../../assets/Student_Detail.jpg";
import Author_02 from "../../../../../assets/author-02.jpg";
import CourseBannerSession from "../banner-session/banner";
import ReactPlayer from "react-player";
import QuizApp from "../course-quiz/quiz";
import "./course-detail.css";
import env from "../../../../../environment.json";
import CourseBuy from "../course-buy/course-buy";
function CourseDetail(props) {
  const [tokens, setTokens] = useState();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const urlMedia = env.urls.media;
  const [productA, setProductsA] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  let url = "null";
  if (currentUser === null) {
    url = `http://localhost:8080/api/project4/thanh/lesson/${params.id}`;
  } else {
    url = `http://localhost:8080/api/project4/thanh/lesson/${currentUser.userId}/${params.id}`;
  }
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProductsA(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [params]);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <CourseBannerSession />
      <div className="mt-5 course-detail container">
        <Row className="course-detail_card">
          <div className="course-detail_card_image col-sm-8">
            <img
              src={Student_Detail}
              alt={productA.title}
              className="img-fluid"
            />
          </div>
          <div className="text-start col-sm-4 course-detail_card_right">
            <div className="course-detail_card_right_price">
              <h3>
                <i class="bi bi-gem fs-4 px-2 text-success"></i>
                {productA.price}
              </h3>
            </div>
            <div className="course-common course-detail_card_right_authorname">
              <h6 className="">Category Name</h6>
              <h6 className="course-common_text">{productA.categoryName}</h6>
            </div>
            <div className="course-common course-detail_card_right_authorname">
              <h6 className="">Author</h6>
              <h6 className="course-common_text">{productA.authorName}</h6>
            </div>
            <div className="course-common course-detail_card_right_authorname">
              <h6 className="">Prize</h6>
              <h6 className="course-common_text">{productA.prize}</h6>
            </div>
            <div className="course-common course-detail_card_right_title">
              <h6 className="">Title</h6>
              <h6 className="course-common_text">{productA.title}</h6>
            </div>
            <div className="course-detail_addCart">
              {productA.video === null ? (
                <CourseBuy
                  lesson={params.id}
                />
              ) : (
                <div className="fs-1 text-success">
                  {" "}
                  {<i class="bi bi-award text-warning"></i>}{" "}
                </div>
              )}
            </div>
          </div>
        </Row>
        <Row className="px-3">
          <div className="course-common course-detail_card_right_title">
            <p className="course-common_text">{productA.content}</p>
          </div>
        </Row>
        <Row>
          <div className="course-detail_card_title_author">
            <div className="course-detail_card_title_author_image">
              <img src={Author_02} alt="course-01" />
            </div>
            <div className="course-detail_card_title_author_detail">
              <h6>
                {productA.authorName} <i class="bi bi-pause"></i>{" "}
                {productA.categoryName}
              </h6>
            </div>
          </div>
        </Row>
        <Row>
          {productA.video === null ? (
            <div className="course-detail_video">
              <div className="course-detail_video_message">
                <h3>{productA.errorMessage}</h3>
              </div>
              <div className="youtube-player">
                <ReactPlayer
                  url={urlMedia + productA.video}
                  controls={true}
                  width="800px"
                  height="450px"
                />
              </div>
            </div>
          ) : (
            <div className="course-detail_video">
              <div className="course-detail_video_message">
                <h3>Let enjoy you course</h3>
              </div>
              <div className="youtube-active">
                <ReactPlayer
                  url={urlMedia + productA.video}
                  controls={true}
                  width="800px"
                  height="450px"
                />
              </div>
            </div>
          )}
        </Row>
        <Row>
          <QuizApp
            course={productA}
            user={currentUser}
            question={params.id}
          />
        </Row>
        <Row>
          <div className="pt-4">
            <h5 className="p-2">Comments</h5>
            <div
              className="comments-container shadow-sm"
              style={{ maxHeight: "400px", overflow: "auto" }}
            >
              {productA.comments &&
                productA.comments.map((item) => (
                  <Row key={item.feedbackId} className="mb-2">
                    <Col className="border-bottom-light">
                      <div className="d-flex justify-content-between">
                        <h6 className="text-success mb-0">{item.userName}</h6>
                        <small className="text-muted">{item.creatatedAt}</small>
                      </div>
                      <p className="text-muted">{item.content}</p>
                    </Col>
                  </Row>
                ))}
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}

export default CourseDetail;
