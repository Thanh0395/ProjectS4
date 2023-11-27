import React from "react";
import { Link } from "react-router-dom";
import './ProductSingle.css'

const ProductSingle = ({ element, type = 1 }) => {
  const MAX_DESCRIPTION_LENGTH = 500; // Define the maximum length of the description

  const truncatedDescription =
    element.description.length > MAX_DESCRIPTION_LENGTH
      ? `${element.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
      : element.description;

  return (
    <div className={`blog-single ${type === 1 ? "blog-single-1" : ""}`}>
      <div className="blog-single-wrapper">
        <div className="blog-single-content">
          <div className="blog-image">
            <img src={element.image} alt="blog-thumbnail" />
          </div>
          {type === 2 ? (
            <div className="img-hover">
              <div className="icon">
                <i className="las la-link"></i>
              </div>
            </div>
          ) : (
            ""
          )}

          <Link to={element.url} className="product-link">
            <h3>{element.title}</h3>
          </Link>
          <div className="product-details">
            <div className="product-category">
              <i className="las la-comment-alt"></i>
              {element.category}
            </div>
            <div className="product-price">
              <i className="las la-calendar"></i>
              {element.price}
            </div>
          </div>
          <p className="product-description">
            {truncatedDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSingle;
