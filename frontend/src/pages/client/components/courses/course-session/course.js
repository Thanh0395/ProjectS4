import { React, useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../../../components/context/ProductContext";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Spinner } from "react-bootstrap";
import { Rating } from "@mui/material";
import FilterCourse from "./filter-course";
import "./course.css";
import Course_01 from "../../../../../assets/courses-01.jpg";
import Course_02 from "../../../../../assets/courses-02.jpg";
import Course_03 from "../../../../../assets/courses-03.jpg";
import Author_01 from "../../../../../assets/author-01.jpg";
import Author_02 from "../../../../../assets/author-02.jpg";
import Author_03 from "../../../../../assets/author-03.jpg";

const CourseSession = () => {
  // Pagination
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const handleGetPageDetail = (item) => {
    navigate(`/products/detail/${item.id}`, { state: { product: item } });
  };

  const [proState, proDispatch] = useContext(ProductContext); //Get all states, eg(proState.filteredProducts, proState.products,...)
  const handleCurrentPage = (page) => {
    proDispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };
  // offset là item dc chia trong 1 page
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    setItemOffset(0);
  }, [proState.filteredProducts]);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = proState.filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(proState.filteredProducts.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % proState.filteredProducts.length;
    setItemOffset(newOffset);
    handleCurrentPage(event.selected);
  };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 38) {
          clearInterval(intervalId);
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <FilterCourse />
      {proState.isLoading ? (
        <>
          <Spinner animation="border" variant="primary" />{" "}
          <span>Loading...</span>
        </>
      ) : (
        <>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            onPageChange={handlePageClick}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            forcePage={proState.currentPage}
            containerClassName="pagination justify-content-center"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
          />
          <section className="course-list container">
            {currentItems.length === 0 ? (
              <div className="text-center">No data to show</div>
            ) : (
              currentItems.map((product) => (
                <div className="card course-list_card" key={product.id}>
                  <div className="card-body">
                    <div className="course-list_card_image">
                      <img src={Course_01} alt={product.title} />
                    </div>
                    <div className="course-list_card_title">
                      <div className="course-list_card_title_image">
                        <img src={Author_01} alt="course-01" />
                      </div>
                      <div className="course-list_card_title_detail">
                        <h6>{product.title}</h6>
                      </div>
                    </div>
                    <div>
                      <h6>
                        Data Science and Machine Learning with Python - Hands
                        On!
                      </h6>
                    </div>
                    <div className="course-list_card_title_percent">
                      <h6>{progress}% Discount</h6>
                      <div
                        className="course-list_card_title_progress"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                      <div className="course-list_card_title_progress_line"></div>
                    </div>
                    <div className="course-list_card_title_progress_rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={product.rating.rate}
                        precision={0.1}
                        readOnly
                      />
                      <button className="course-list_card_title_detail">
                        Course Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>

          {/* <Row>
            {currentItems.length === 0 ? (
              <div className="text-center">No data to show</div>
            ) : (
              currentItems.map((product) => (
                <Col
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-3"
                >
                  <Card className="mb-3" style={{ height: "400px" }}>
                    <div style={{ height: "200px", overflow: "hidden" }}>
                      <Card.Img
                        src={product.image}
                        alt={product.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title className="text-truncate">
                        {product.title}
                      </Card.Title>
                      <Card.Subtitle>Price: {product.price}</Card.Subtitle>
                      <Card.Subtitle>
                        <Rating
                          name="half-rating-read"
                          defaultValue={product.rating.rate}
                          precision={0.1}
                          readOnly
                        />
                      </Card.Subtitle>
                      <Card.Text className="text-truncate">
                        {product.description}
                      </Card.Text>
                      <Button onClick={() => handleGetPageDetail(product)}>
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row> */}
        </>
      )}
    </>
  );
};

export default CourseSession;
