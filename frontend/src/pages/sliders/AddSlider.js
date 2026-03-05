import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";
import { addSlider } from "./sliderSlice";

const AddSlider = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);
    }
    dispatch(addSlider(formData));
    navigate("/slider", { replace: true });
  };

  return (
    <>
      <Common />
      <main className="add_user">
        <h2 className="visa_form">Add New Slide</h2>
        <hr className="user_manage_hr" />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="form-label" htmlFor="thumbnail">
              Slide Title*
            </label>
            <input
              className="form-control mb-3 p-2"
              type="text"
              placeholder="Enter designation name"
              name="thumbnail"
              value={thumbnail}
              onChange={(e) => {
                setThumbnail(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="title">
              Slide Content*
            </label>
            <input
              className="form-control mb-3 p-2"
              type="text"
              placeholder="Enter  name"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="image">
              Image*
            </label>
            <input
              className="form-control mb-3 p-2"
              type="file"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="publish">
              Status
            </label>{" "}
            <select
              id="publish"
              className="form-select publish mb-3 p-2"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Published">Published</option>{" "}
              <option value="Unpublished">Unpublished</option>{" "}
            </select>{" "}
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddSlider;
