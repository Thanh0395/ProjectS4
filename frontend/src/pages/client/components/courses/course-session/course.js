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
import env from "../../../../../environment.json";
const CourseSession = () => {
  const urlMedia = env.urls.media;

  // Pagination
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const handleGetPageDetail = (item) => {
    console.log("Item:", item.id);
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
          <section className="course-list container">
            {currentItems.length === 0 ? (
              <div className="text-center">No data to show</div>
            ) : (
              currentItems.map((course) => (
                <div className="card course-list_card" key={course.id}>
                  <div className="card-body">
                    <div className="course-list_card_image">
                      <img
                        className="course-list_card_image_course"
                        src={urlMedia + course.featureImage}
                        alt={course.title}
                      />
                    </div>
                    <div className="course-list_card_title">{course.title}</div>
                    <div className="course-list_card_title_author">
                      <div className="course-list_card_title_author_image">
                        <img src={Author_01} alt="course-01" />
                      </div>
                      <div className="course-list_card_title_author_detail">
                        <h6>
                          {course.authorName} <i class="bi bi-pause"></i>{" "}
                          {course.categoryName}
                        </h6>
                      </div>
                    </div>
                    <div className="course-list_card_title_percent_price">
                      <h6>
                        <i class="bi bi-gem px-2 text-primary"></i>{course.price}{" "}
                        <i class="bi bi-gem px-2 text-primary"></i>
                      </h6>
                      <button
                        className="course-list_card_button_detail"
                        onClick={() => handleGetPageDetail(course)}
                      >
                        Course Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </>
      )}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        onPageChange={handlePageClick}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        forcePage={proState.currentPage}
        containerClassName="pagination"
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
    </>
  );
};

export default CourseSession;
