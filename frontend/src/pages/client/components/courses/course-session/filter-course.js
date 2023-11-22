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
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const handlePriceChange = (event, newValue) => {
    proDispatch({ type: "SET_PRICE", payload: newValue });
  };
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
          <span>Filter by price</span>
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
          <input className="" type="text" placeholder="filter here" />
          <div className="course-filter_input_icon"></div>
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
                  onClick={() => handleCategoryChange(item)}
                  className={`cate-filter ${
                    proState.filterBy.category === item ? "active" : ""
                  }`}
                >
                  {item}
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
