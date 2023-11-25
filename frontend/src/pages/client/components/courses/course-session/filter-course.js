import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../../../components/context/ProductContext";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Box, Slider } from "@mui/material";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function FilterCourse(props) {
  const [proState, proDispatch] = useContext(ProductContext);
  // Category
  const handleCategoryChange = (category) => {
    proDispatch({ type: "SET_CATEGORY", payload: category });
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/project4/categories/list-category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const handlePriceChange = (event, newValue) => {
    proDispatch({ type: "SET_PRICE", payload: newValue });
  };
  const handleSearchChange = (event) => {
    console.log("event", event);
    const searchTerm = event.target.value;
    proDispatch({ type: "SET_SEARCH", payload: searchTerm });
  };

  // Assuming you have a search term in your state

  const [swiperRef, setSwiperRef] = useState(null);

  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
    ]);
  };
  return (
    <>
      <section className="course container">
        <div className="course-filter_custom">
          <label className="course-filter_custom_price">
            <span className="text-secondary">
              Coin Range: <i class="bi bi-gem px-2 text-primary"></i>{proState.filterBy.price[0] || 0} <span className="px-2">-</span> <i class="bi bi-gem pe-2 text-primary"></i>
              {proState.filterBy.price[1] || 1000}
            </span>

            <Box sx={{ width: 500 }}>
              <Slider
                getAriaLabel={() => "Price range"}
                size="small"
                max={1000}
                defaultValue={[0, 1000]}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
              />
            </Box>
          </label>
          <div className="course-filter_input">
            <input
              className=""
              type="text"
              placeholder="Search: courses, authors, teachers"
              onChange={handleSearchChange}
            />
            <div className="course-filter_input_icon"><i class="bi bi-search"></i></div>
          </div>
        </div>

        <div className="course-filter">
          <Swiper
            // install Swiper modules
            slidesPerView={4}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <button
                onClick={() => handleCategoryChange("")}
                className={`cate-filter ${
                  proState.filterBy.category === "" ? "active" : ""
                }`}
              >
                All Course
              </button>
            </SwiperSlide>
            {categories.map((item, index) => (
              <SwiperSlide>
                <button
                  as={Link}
                  key={index}
                  onClick={() => handleCategoryChange(item.categoryName)}
                  className={`cate-filter ${
                    proState.filterBy.category === item.categoryName
                      ? "active"
                      : ""
                  }`}
                >
                  {item.categoryName}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default FilterCourse;
