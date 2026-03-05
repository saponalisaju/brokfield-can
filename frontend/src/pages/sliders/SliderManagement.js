import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlider, deleteSlider } from "./sliderSlice";
import "../../assets/styles/main.css";

const SliderManagement = () => {
  const { users, status } = useSelector((state) => state.slider);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSlider());
    }
  }, [status, dispatch]);

  const deleteHandler = (id) => {
    if (typeof id === "string" && id.length === 24) {
      dispatch(deleteSlider(id));
    } else {
      console.error("Invalid ID format: " + id);
    }
  };

  return (
    <>
      <div className="example3">
        <Common />
      </div>
      <main
        data-bs-spy="scroll"
        data-bs-target="#example3"
        data-bs-offset="0"
        className="scrollspy-example user_manage me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="user_manage_head  d-flex">
          <h2 className="me-auto user_manage_app">Slider Management</h2>
          <Link className="btn btn-primary p-2" to="/addSliders">
            Add New Slide
          </Link>
        </div>
        <hr className="slider_manage_hr" />
        <table className="table table-striped-column table-bordered">
          <thead className="">
            <tr>
              <th scope="col" className="bg-light">
                THUMBNAIL
              </th>
              <th scope="col" className="bg-light">
                TITLE
              </th>
              <th scope="col" className="bg-light">
                STATUS
              </th>
              <th scope="col" className="bg-light">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user) => {
                const { _id, thumbnail, title, image, status } = user;
                console.log(user);
                return (
                  <tr key={_id}>
                    <td>{thumbnail}</td>
                    <td>{title}</td>
                    <td>Pending</td>

                    <td>
                      <Link
                        to="/editSlider"
                        state={{ _id, thumbnail, title, image, status }}
                      >
                        <button className="btn btn-white text-primary p-1">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-white text-danger p-1"
                        onClick={() => {
                          deleteHandler(_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default SliderManagement;
