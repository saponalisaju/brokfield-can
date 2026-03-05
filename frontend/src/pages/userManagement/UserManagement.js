import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";

import "../../assets/styles/main.css";

import api from "./userApi";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/get_users`);
        console.log("hello user", response);
        setUsers(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    if (typeof id === "string" && id.length === 24) {
      setLoading(true);
      setError("");
      try {
        const response = await api.delete(`/delete_user/${id}`);
        if (response.status === 200) {
          const updatedResponse = await api.get(`/get_users`);
          setUsers(updatedResponse.data);
        } else {
          console.error("Failed to delete user:", response.data.message);
          setError("Failed to delete user:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Error deleting user:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Invalid ID format:", id);
    }
  };
  return (
    <>
      <div className="example2 relative">
        <Common />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <main
        data-bs-spy="scroll"
        data-bs-target="#example2"
        data-bs-offset="0"
        className="scrollspy-example user_manage me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="user_manage_head  d-flex">
          <h2 className="me-auto user_manage_app">User Management</h2>
          <Link className="btn btn-primary btn-sm " to="/addUserManagement">
            Add New User
          </Link>
        </div>
        <hr className="user_manage_hr" />
        <table className="table table-striped-column table-bordered">
          <thead className="">
            <tr className="">
              <th scope="col" className="bg-light">
                NAME
              </th>
              <th scope="col" className="bg-light">
                EMAIL
              </th>
              <th scope="col" className="bg-light">
                ROLE
              </th>
              <th scope="col" className="bg-light">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user) => {
                const { _id, name, email, role } = user;
                console.log(user);
                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>Admin</td>
                    <td>
                      <Link
                        to="/editUserManagement"
                        state={{ _id, name, email, role }}
                      >
                        <button className="user-button btn btn-white text-primary p-1">
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

export default UserManagement;
