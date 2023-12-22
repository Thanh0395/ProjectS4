import { React, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { Spinner, Nav } from "react-bootstrap";
import { Rating } from "@mui/material";
import "./CourseProfile.css";
import CourseHeaderProfile from "./CourseHeaderProfile";

const CourseSessionProfile = ({ posts }) => {
  const itemsPerPage = 4;
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleGetPageDetail = (item) => {
    console.log("Item:", item.postId);
    navigate(`/products/detail/${item.postId}`, { state: { product: item } });
  };
  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };
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

  const handlePageClick = (event) => {
    if (Array.isArray(posts)) {
      const newOffset = (event.selected * itemsPerPage) % posts.length;
      setItemOffset(newOffset);
    }
  };
  
  const handleClickAvatarAuthor = (userId) => {
    navigate('/profile', {
      state: { userId: userId } 
    });
  }

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = Array.isArray(posts) ? posts.slice(itemOffset, endOffset) : [];

  const pageCount = Array.isArray(posts) ? Math.ceil(posts.length / itemsPerPage) : 0;

  return (
    <>
      {posts.length === 0 ? (
        <div className="text-center">No data a to show</div>
      ) : (
        <section className="course-list container">
          {currentItems.length === 0 ? (
            <div className="text-center">No data b to show</div>
          ) : (
            currentItems.map((course) => (
              <div className="card course-list_card" key={course.id}>
                <div className="card-body" style={{ margin: "10px" }}>
                  <div className="course-list_card_image">
                    <img
                      className="course-list_card_image_course"
                      src={`http://localhost:8080/${course.featureImage}`}
                      alt={course.title}
                    />
                  </div>
                  <div className="course-list_card_title">{course.title}</div>
                  <div className="course-list_card_title_author">
                    <button
                      href="#"
                      onClick={() => handleClickAvatarAuthor(course.userId)}
                      className="course-list_card_title_author_image"
                    >
                      <img
                        src={`http://localhost:8080/${course.avatar}`}
                        alt="course-01"
                      />
                    </button>
                    <div className="course-list_card_title_author_detail">
                      <h6>
                        {course.authorName} <i class="bi bi-pause"></i>{" "}
                        {course.categoryName}
                      </h6>
                    </div>
                  </div>
                  <div className="course-list_card_title_percent_price">
                    <h6>
                      {course.price}{" "}
                      <i class="bi bi-gem px-2 text-primary"></i>
                    </h6>
                  </div>
                  <button
                    className="course-list_card_button_detail"
                    onClick={() => handleGetPageDetail(course)}
                  >
                    Course Detail
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      )}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        onPageChange={handlePageClick}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
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

export default CourseSessionProfile;
