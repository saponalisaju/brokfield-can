import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Common from "../layouts/Common";
import "../assets/styles/main.css";
import api from "./api";

const User = () => {
  const navigate = useNavigate();
  const [getUser, setGetUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/users/get_users");
        setGetUser(response.data.users[0]); // first admin user
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = useCallback(() => {
    const removeCookie = (name) => {
      document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=None; Secure`;
    };
    try {
      ["refreshToken"].forEach(removeCookie);
      localStorage.removeItem("token");
      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }, [navigate]);

  const deleteHandler = async (id) => {
    try {
      // Call API to delete user
      const response = await api.delete(`/users/delete_user/${id}`);

      if (response.status === 200) {
        console.log("User deleted successfully");

        // Remove tokens and logout
        handleLogout();
      } else {
        console.error("Failed to delete user:", response.data.message);
        setError("Failed to delete user");
      }

      // Optional: update state after deletion
      setGetUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user");
    }
  };

  return (
    <>
      <div className="example2 relative">
        <Common />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <main
        className="scrollspy-example user_manage me-5"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="user_manage_head d-flex">
          <h2 className="me-auto user_manage_app">Profile Management</h2>

          {/* <Link className="btn btn-primary btn-sm" to="/addUserManagement">
            Add New User
          </Link> */}
        </div>

        <hr className="user_manage_hr" />

        <table className="table table-striped-column table-bordered">
          <thead>
            <tr>
              <th className="bg-light">NAME</th>
              <th className="bg-light">EMAIL</th>
              <th className="bg-light">ROLE</th>
              <th className="bg-light">ACCOUNT NAME</th>
              <th className="bg-light">ACCOUNT NUMBER</th>
              <th className="bg-light">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {getUser && (
              <tr>
                <td>{getUser.name}</td>
                <td>{getUser.email}</td>
                <td>Admin</td>
                <td>{getUser.accountName}</td>
                <td>{getUser.accountNumber}</td>
                <td>
                  <Link
                    to="/update_user"
                    state={{
                      _id: getUser._id,
                      name: getUser.name,
                      email: getUser.email,
                    }}
                  >
                    <button className="btn btn-white text-primary p-1">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="btn btn-white text-danger p-1"
                    onClick={() => deleteHandler(getUser._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default User;
