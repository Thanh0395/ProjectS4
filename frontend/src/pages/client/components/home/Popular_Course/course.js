import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./course.css";
import image_1 from "../../../../../images/popular_course/course_1.jpg";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
export default function Course() {
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
      <section className="o-course container">
        <div>
          <h1>Popular Course</h1>
        </div>
        <div className="o-course-session-card pt-4">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="popular-course"
          >
            <SwiperSlide>
              <div className="card o-course-card">
                <div className="o-course-card_image">
                  <img src={image_1} />
                </div>
                <div className="o-course-card_title p-3 row ">
                  <div className="col-6">
                    <h4 className="text-muted">3D Studio MAX</h4>
                    <h6 className="text-secondary">Melisa Jonh</h6>
                  </div>
                  <div className="col-6 text-end">
                    <button className="border-0 bg-primary text-white px-2 p-1">
                      220
                    </button>
                  </div>
                </div>
                <div className="o-course-card_content p-3 text-secondary">
                  <p>
                    Lorem Ipsn gravida nibh vel velit auctor aliquet.Aenean
                    sollicitudin
                  </p>
                </div>
                <div className="o-course-card_count d-flex p-3 text-secondary">
                  <div className="col-2">
                    <i class="bi bi-person-hearts pe-2"></i>1
                  </div>
                  <div className="col-4">
                    <i class="bi bi-alarm pe-2"></i>2 hours
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card o-course-card">
                <div className="o-course-card_image">
                  <img src={image_1} />
                </div>
                <div className="o-course-card_title p-3 row ">
                  <div className="col-6">
                    <h4 className="text-muted">3D Studio MAX</h4>
                    <h6 className="text-secondary">Melisa Jonh</h6>
                  </div>
                  <div className="col-6 text-end">
                    <button className="border-0 bg-primary text-white px-2 p-1 fw-bolder">
                      220
                    </button>
                  </div>
                </div>
                <div className="o-course-card_content p-3 text-secondary">
                  <p>
                    Lorem Ipsn gravida nibh vel velit auctor aliquet.Aenean
                    sollicitudin
                  </p>
                </div>
                <div className="o-course-card_count d-flex p-3 text-secondary">
                  <div className="col-2">
                    <i class="bi bi-person-hearts pe-2"></i>1
                  </div>
                  <div className="col-4">
                    <i class="bi bi-alarm pe-2"></i>2 hours
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card o-course-card">
                <div className="o-course-card_image">
                  <img src={image_1} />
                </div>
                <div className="o-course-card_title p-3 row ">
                  <div className="col-6">
                    <h4 className="text-muted">3D Studio MAX</h4>
                    <h6 className="text-secondary">Melisa Jonh</h6>
                  </div>
                  <div className="col-6 text-end">
                    <button className="border-0 bg-primary text-white px-2 p-1">
                      220
                    </button>
                  </div>
                </div>
                <div className="o-course-card_content p-3 text-secondary">
                  <p>
                    Lorem Ipsn gravida nibh vel velit auctor aliquet.Aenean
                    sollicitudin
                  </p>
                </div>
                <div className="o-course-card_count d-flex p-3 text-secondary">
                  <div className="col-2">
                    <i class="bi bi-person-hearts pe-2"></i>1
                  </div>
                  <div className="col-4">
                    <i class="bi bi-alarm pe-2"></i>2 hours
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card o-course-card">
                <div className="o-course-card_image">
                  <img src={image_1} />
                </div>
                <div className="o-course-card_title p-3 row ">
                  <div className="col-6">
                    <h4 className="text-muted">3D Studio MAX</h4>
                    <h6 className="text-secondary">Melisa Jonh</h6>
                  </div>
                  <div className="col-6 text-end">
                    <button className="border-0 bg-primary text-white px-2 p-1">
                      220
                    </button>
                  </div>
                </div>
                <div className="o-course-card_content p-3 text-secondary">
                  <p>
                    Lorem Ipsn gravida nibh vel velit auctor aliquet.Aenean
                    sollicitudin
                  </p>
                </div>
                <div className="o-course-card_count d-flex p-3 text-secondary">
                  <div className="col-2">
                    <i class="bi bi-person-hearts pe-2"></i>1
                  </div>
                  <div className="col-4">
                    <i class="bi bi-alarm pe-2"></i>2 hours
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
