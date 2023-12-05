import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Badge, Button, Container, Row, Col } from "react-bootstrap";
import CourseImage from "../../../../../assets/courses-02.jpg";
import Student_Detail from "../../../../../assets/Student_Detail.jpg";
import Author_02 from "../../../../../assets/author-02.jpg";
import CourseBannerSession from "../banner-session/banner";
import "./course-detail.css";
function CourseDetail(props) {
  const [productA, setProductsA] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/project4/thanh/lesson/${params.id}`)
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
            <div className="course-common course-detail_card_right_title">
            <p className="course-common_text">{productA.content}</p>

            </div>
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
          </div>
          <div className="text-start col-sm-4 course-detail_card_right">
            <div className="course-detail_card_right_price">
              <h3>${productA.price}</h3>
            </div>
            <div className="course-common course-detail_card_right_authorname">
              <h6 className="">Author</h6>
              <h6 className="course-common_text">{productA.authorName}</h6>
            </div>
            <div className="course-common course-detail_card_right_authorname">
              <h6 className="">Author</h6>
              <h6 className="course-common_text">{productA.authorName}</h6>
            </div>
            <div className="course-common course-detail_card_right_authorname">
              <h6 className="">Author</h6>
              <h6 className="course-common_text">{productA.authorName}</h6>
            </div>
            <div className="course-common course-detail_card_right_authorname">
              <h6 className="">Author</h6>
              <h6 className="course-common_text">{productA.authorName}</h6>
            </div>
            <div className="course-common course-detail_card_right_title">
              <h6 className="">Title</h6>
              <h6 className="course-common_text">{productA.title}</h6>
            </div>
            <div className="course-common">
              <h6>Category</h6>
              <h6 className="course-common_text">{productA.categoryName}</h6>
            </div>
            <div className="course-detail_addCart">
              <button>Add to Cart</button>
            </div>
          </div>
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
                        <h6 className="text-success mb-0">
                          {item.userName}
                        </h6>
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
