import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../../../components/context/ProductContext";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
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

  return (
    <>
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
      <section className="course container">
        <div className="course-filter">
          <Swiper
            // install Swiper modules
            modules={[Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={4}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
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
          <div className="course-filter_input">
            <input className="" type="text" placeholder="filter here" />
            <div className="course-filter_input_icon"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FilterCourse;
