import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSlider } from "./sliderSlice";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";

const EditSliders = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState("");
  const [shownOnNavbar, setShownOnNavbar] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setTitle(location.state.title);
      setPublished(location.state.published);
      setShownOnNavbar(location.state.shownOnNavbar);
      setLink(location.state.link);
    } else {
      navigate("/slider");
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSlider({ _id, title, published, shownOnNavbar, link }));
    navigate("/slider");
  };

  return (
    <>
      <Common />
      <main className=" user_manage">
        <h2>Create New Slide</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="published">
              Published
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              id="published"
              name="published"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="shownOnNavbar">
              Shown On Navbar
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              id="shownOnNavbar"
              name="shownOnNavbar"
              value={shownOnNavbar}
              onChange={(e) => setShownOnNavbar(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="link">
              Link
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              id="link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </main>
    </>
  );
};

export default EditSliders;
