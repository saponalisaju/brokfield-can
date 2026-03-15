import React, { useEffect, useState } from "react";
import "../../assets/styles/main.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo_p from "../../assets/images/logo.png";
import moment from "moment";
import Footer from "../../components/component16/Footer";
import api from "../api";

const UserView = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(" ");
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    surname: " ",
    givenN: " ",
    email: " ",
    phone: " ",
    nationalId: " ",
    sex: "",
    dob: " ",
    birthCity: " ",
    currentN: " ",
    identification: "",
    company: " ",
    dutyDuration: " ",
    jobTitle: " ",
    salary: " ",
    image: "",
    passport: " ",
    issuedCountry: " ",
    file1: [],
    file1PublicId: [],
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    setLoading(true);

    try {
      if (location.state) {
        setId(location.state._id);
        setFormData(location.state);
        setLoading(false);
      } else {
        navigate("/application");
      }
    } catch (error) {
      console.error("Error loading application data:", error);
      setError("Error loading application data. Please try again.");
      setLoading(false);
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxFileSize = 7 * 1024 * 1024; // 7 MB

    let errorMessage = "";
    const filteredFiles = [...files].filter((file) => {
      if (!validTypes.includes(file.type)) {
        errorMessage = `Invalid file type: ${file.name} (${file.type}). Allowed types are JPEG and PNG.`;
        return false;
      }
      if (file.size > maxFileSize) {
        errorMessage = `File too large: ${file.name}. Maximum allowed size is 7 MB.`;
        return false;
      }
      return true;
    });

    if (filteredFiles.length === files.length) {
      errorMessage = ""; // Clear error if all validations pass
    }

    setError(errorMessage); // Set error message once

    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: filteredFiles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formDataWithFiles = new FormData();
    for (const key in files) {
      files[key].forEach((file) => {
        formDataWithFiles.append(key, file);
      });
    }

    try {
      const response = await api.put(
        `/application/updateApplicationAdd/${id}`,
        formDataWithFiles,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (response?.status === 200) {
        navigate("/application", { replace: true });
      } else {
        setError("Failed to update application.");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      setError("Error updating application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.put(`/updateApplicationApprove/${id}`);
      if (response?.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to approve application. Server responded with status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error("Error approving application:", error);
      setError(
        `Error approving application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePending = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.put(`/updateApplicationPending/${id}`);
      if (response?.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to pending application. Server responded with status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error("Error pending application:", error);
      setError(
        `Error pending application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.put(`/updateApplicationReject/${id}`);
      if (response?.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to reject application. Server responded with status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
      setError(
        `Error rejecting application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = moment(formData.dob, moment.ISO_8601).format(
    "YYYY-MM-DD",
  );

  return (
    <>
      <React.Fragment>
        <main
          data-bs-spy="scroll"
          data-bs-target="#example2"
          data-bs-offset="0"
          className="p-2 user_view_body "
          tabIndex="0"
          style={{ overflowY: "scroll", maxHeight: "100vh" }}
        >
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <h2 className="pb-3">Applicants Copy ({formData.isStatus})</h2>

          <div className="user_view_body border border-2">
            <div className="d-flex me-auto">
              {formData.image ? (
                <img
                  className="user_image mb-2 p-1"
                  src={formData.image}
                  alt={`${formData.name}'s profile`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://res.cloudinary.com/dfkurqnpj/image/upload/v1740317988/travelApp/application/image.jpg";
                  }}
                />
              ) : (
                <p>No image available</p>
              )}
              <img className="logo_p " src={logo_p} alt="flag" />
              {/* <img
                className="logo_q bg-danger-subtle"
                src={logo_q}
                alt="brand-logo"
              /> */}
            </div>
            <div className="border border-2 view_one mb-2">
              <h2 className="fw-bold text-center text-bg-dark text-uppercase">
                {formData.surname}&nbsp;{formData.givenN}
              </h2>

              <div>
                <h4 className="bg_headline">A. Personal Particulars</h4>
              </div>
              <div className="surname_given ">
                <div className="d-flex surname_head_one">
                  <strong className="border surname_one">Surname</strong>
                  <span className="border surname_result_one">
                    {formData.surname}
                  </span>
                </div>
                <div className="d-flex">
                  <strong className="border surname_one">Given Name</strong>
                  <span className="border surname_result_one">
                    {formData.givenN}
                  </span>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">Sex</strong>
                    <span className="border surname_sex">{formData.sex}</span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      Date of Birth
                    </strong>
                    <span className="border surname_sex">{formattedDate}</span>
                  </div>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex">
                      Place of Birth Town/City
                    </strong>
                    <span className="border surname_sex">
                      {formData.birthCity}
                    </span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex">
                      Visible Identification Marks
                    </strong>
                    <span className="border surname_sex">
                      {formData.identification}
                    </span>
                  </div>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      Current Nationality
                    </strong>
                    <span className="border surname_sex">
                      {formData.currentN}
                    </span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      National ID No
                    </strong>
                    <span className="border surname_sex">
                      {formData.nationalId}
                    </span>
                  </div>
                </div>
              </div>

              <h4 className="bg_headline">B. Company Details</h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Company Name
                  </strong>
                  <span className="border surname_sex">{formData.company}</span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Job Title</strong>
                  <span className="border surname_sex">
                    {formData.jobTitle}
                  </span>
                </div>
              </div>
              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex">Duty Duration</strong>
                  <span className="border surname_sex">
                    {formData.dutyDuration}
                  </span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex">Salary</strong>
                  <span className="border surname_sex">{formData.salary}</span>
                </div>
              </div>

              <h4 className=" bg_headline">C. Passport Details</h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Passport No
                  </strong>
                  <span className="border surname_sex">
                    {formData.passport}
                  </span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Issued Country
                  </strong>
                  <span className="border surname_sex">
                    {formData.issuedCountry}
                  </span>
                </div>
              </div>

              <h4 className=" bg_headline">D. Applicant's Contact Details</h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Phone</strong>
                  <span className="border surname_sex">{formData.phone}</span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Email</strong>
                  <span className="border surname_sex email_user">
                    {formData.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="upload_head pb-2 ">
              <div className="file_upload  ">
                <h2 className="form-label fs-3 ">Document Upload</h2>
                <form
                  onSubmit={handleSubmit}
                  className=" d-flex w-100 p-1"
                  encType="multipart/form-data"
                >
                  <input
                    className="mb-3 form-control"
                    name="file1"
                    type="file"
                    multiple
                    onChange={handleChange}
                  />

                  <button
                    disabled={files.length === 0 || loading}
                    type="submit"
                    className="btn btn-primary upload_btn btn-sm upload_b"
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="image_display">
                  <h1>Documents:</h1>
                  <ul className="multiple_file">
                    {formData.file1 &&
                      formData.file1.map((file, index) => (
                        <li className="" key={index}>
                          <img
                            className="w-100 pb-1"
                            src={file}
                            alt="document"
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="justify-content-end d-flex theme_description ">
              <Link
                onClick={() => handlePending(id)}
                className="btn btn-secondary btn_approved"
              >
                Pending
              </Link>
              <Link
                className="btn btn-primary btn_approved"
                onClick={() => handleApprove(id)}
              >
                Approve
              </Link>
              <Link
                className="btn btn-danger btn_approved"
                onClick={() => handleReject(id)}
              >
                Reject
              </Link>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
          <Footer />
        </main>
      </React.Fragment>
    </>
  );
};

export default UserView;
