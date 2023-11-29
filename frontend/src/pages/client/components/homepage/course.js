/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import CourseFilter from "./course-component/CourseFilter";

import axios from "axios";
import CourseSingle from "./course-component/CourseSingle";
const API = "http://localhost:8080/api/project4/thanh/lesson/list";

const CourseSection = () => {
  const [postData, setPostData] = useState([]);
  const [activeData, setActiveData] = useState(0);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(API); // Replace with your actual backend endpoint
        setPostData(response.data); // Assuming the response contains an array of PostEntity objects
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="section-padding">
      <div className="container">
        <div className="text-center">
          <div className="mini-title">Popular Courses</div>
          <div className="column-title ">
            Choose Our Top <span className="shape-bg">Courses</span>
          </div>
        </div>

        <div className="container">
          <CourseFilter
            mainData={postData}
            activeData={activeData}
            setActiveData={setActiveData}
            setFilterData={setFilterData}
          />
        </div>

        <div className="flex flex-wrap pt-10 grids">
          {filterData?.length > 0 ? (
            filterData
              .slice(0, 6)
              .map((data, index) => <CourseSingle key={index} data={data} />)
          ) : (
            <h1 style={{ textAlign: "center" }}>Not Found Any Data</h1>
          )}
        </div>
        <div className="text-center lg:pt-16 pt-10">
          <a href="#" className=" btn btn-primary">
            View All Courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
