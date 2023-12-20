import React from 'react';
import "../Custom/CourseHeaderProfile.css"
const CourseHeader = ({ header }) => {
  return (
    <div className="appBar"> 
      <div className="container mt-3 text-center">
        <h2 className="mb-4">{header}</h2>
      </div>
    </div>
  );
};

export default CourseHeader;
