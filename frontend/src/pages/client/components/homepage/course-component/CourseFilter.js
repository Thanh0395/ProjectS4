import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseFilter = ({
  activeData,
  setFilterData,
  mainData,
  setActiveData,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try { 
        const response = await axios.get(
          "http://localhost:8080/api/project4/thanh/lesson/list"
        );
        setCategories(response.data); // Assuming the response contains an array of category names
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeData === 0) {
      setFilterData(mainData);
    } else {
      const filteredData = mainData.filter((data) => {
        return data.categoryName === activeData; // Ensure correct comparison with categoryName
      });
      setFilterData(filteredData);
    }
  }, [activeData, setFilterData, mainData]);

  return (
    <ul
      className="filter-list flex xl:space-x-[39px] space-x-8"
      style={{ textTransform: "capitalize" }}
    >
      {categories.length > 0 ? (
        <>
          <li
            className={activeData === 0 ? "active filter" : "filter"}
            onClick={() => setActiveData(0)}
          >
            See All
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              className={
                activeData === category.categoryName
                  ? "filter active"
                  : "filter"
              }
              onClick={() => setActiveData(category.categoryName)}
            >
              {category.categoryName}
            </li>
          ))}
        </>
      ) : (
        <li>Loading categories...</li>
      )}
    </ul>
  );
};

export default CourseFilter;
  