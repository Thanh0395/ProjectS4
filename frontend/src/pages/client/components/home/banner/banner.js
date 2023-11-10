import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import banner_1 from "../../../../../images/banner/banner_1.jpg";
import banner_2 from "../../../../../images/banner/banner_2.jpg";
import banner_3 from "../../../../../images/banner/banner_3.jpg";
import banner_4 from "../../../../../images/banner/banner_4.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./banner.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Banner() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="swiper-slide-group">
            <img src={banner_1} className="swiper-slide-image" />
            <div className="swiper-slide-group_content">
              <h1 className="swiper-slide-group_content_banner-header">The language of the world</h1>
              <h4 className="swiper-slide-group_content_banner-subheader">A simple amazing opportunity to expand your knowledge</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide-group">
            <img src={banner_2} className="swiper-slide-image" />
            <div className="swiper-slide-group_content">
              <h1 className="swiper-slide-group_content_banner-header">The language of the world</h1>
              <h4 className="swiper-slide-group_content_banner-subheader">A simple amazing opportunity to expand your knowledge</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide-group">
            <img src={banner_3} className="swiper-slide-image" />
            <div className="swiper-slide-group_content">
              <h1 className="swiper-slide-group_content_banner-header">The language of the world</h1>
              <h4 className="swiper-slide-group_content_banner-subheader">A simple amazing opportunity to expand your knowledge</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide-group">
            <img src={banner_4} className="swiper-slide-image" />
            <div className="swiper-slide-group_content">
              <h1 className="swiper-slide-group_content_banner-header">The language of the world</h1>
              <h4 className="swiper-slide-group_content_banner-subheader">A simple amazing opportunity to expand your knowledge</h4>
            </div>
          </div>
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <div className="banner-form">
        <div className="banner-form_lable">
          <div className="banner-form_lable_icon">
            <i class="bi bi-bookmarks-fill"></i>
          </div>
          <select class="form-select" aria-label="Default select example">
            <option selected>Category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="banner-form_lable">
          <div className="banner-form_lable_icon">
            <i class="bi bi-layer-backward"></i>
          </div>
          <select class="form-select" aria-label="Default select example">
            <option selected>Intructor</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="banner-form_lable">
          <div className="banner-form_lable_icon">
            <i class="bi bi-currency-dollar"></i>
          </div>
          <select class="form-select" aria-label="Default select example">
            <option selected>Price</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="banner-form_lable">
          <input
            className="banner-form-submit btn btn-secondary"
            type="submit"
            value={"SEARCH COURCES"}
          />
        </div>
      </div>
      <button
        className="banner-toggle"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
         <i class="bi bi-currency-dollar"></i>
      </button>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
            Offcanvas with body scrolling
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
    </>
  );
}
