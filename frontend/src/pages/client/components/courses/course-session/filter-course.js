import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../../../components/context/ProductContext";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Box, Slider } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
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

  return (
    <>
      <section className="course">
        <div className="course-filter">
          <div className="course-filter_button">
            {/* <button
              onClick={() => handleCategoryChange("")}
              className={`cate-filter ${
                proState.filterBy.category === "" ? "active" : ""
              }`}
              >
              All Course
            </button> */}
            <Swiper
               spaceBetween={50}
               slidesPerView={3}
               onSlideChange={() => console.log('slide change')}
               onSwiper={(swiper) => console.log(swiper)}
            >
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
          <div className="course-filter_input">
            <input className="" type="text" placeholder="filter here" />
            <div className="course-filter_input_icon"></div>
          </div>
        </div>
      </section>
      {/* <label>
        <span>Price:</span>
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => "Price range"}
            size="small"
            max={1000}
            defaultValue={[0, 1000]}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
          />
        </Box>
      </label> */}
    </>
  );
}

export default FilterCourse;
