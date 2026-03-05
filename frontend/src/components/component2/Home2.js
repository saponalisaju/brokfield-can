import React from "react";
import "./Home2.css";
import Img1 from "../../assets/images/can_1.jpg";
import Img2 from "../../assets/images/can_2.jpg";
import Img3 from "../../assets/images/can_3.jpg";
import Img4 from "../../assets/images/can_4.jpg";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

const Component2 = () => {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner ">
          <div className="carousel-item active ">
            <img src={Img1} className="d-block rounded-3" alt="slide" />
          </div>
          <div className="carousel-item">
            <img src={Img2} className="d-block rounded-3" alt="slide" />
          </div>
          <div className="carousel-item">
            <img src={Img3} className="d-block rounded-3" alt="slide" />
          </div>
          <div className="carousel-item">
            <img src={Img4} className="d-block rounded-3" alt="slide" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Component2;
