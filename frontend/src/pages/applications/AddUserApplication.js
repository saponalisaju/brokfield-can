import React, { useEffect, useState } from "react";
import enq from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";
import api from "../api";

const jobSalaries = {
  "Food Paching": "$4500",
  Restaurant: "$4500",
  "Worker Security": "$4000",
  Driver: "$5500",
  Electrician: "$4500",
  Cleaner: "$3500",
  Agriculture: "$4000",
  Supervisor: "$5000",
  Manager: "$6000",
};

const AddUserApplication = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    surname: "",
    givenN: "",
    email: "",
    phone: "",
    nationalId: "",
    sex: "",
    dob: "",
    birthCity: "",
    currentN: "",
    identification: "",
    company: "",
    dutyDuration: "",
    jobTitle: "",
    salary: "",
    image: null,
    passport: "",
    issuedCountry: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await api.get(`/application/fetchApplication`);
        setApplications(response.data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Error fetching applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const selectedFile = files[0];
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (selectedFile && selectedFile.size > maxSize) {
        setError("File size exceeds the limit of 10 MB.");
        setFormData((prevData) => ({ ...prevData, image: null }));
        setImagePreview(null);
      } else {
        setError("");
        setFormData((prevData) => ({ ...prevData, image: selectedFile }));

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const {
      surname,
      givenN,
      email,
      phone,
      nationalId,
      sex,
      dob,
      birthCity,
      currentN,
      identification,
      company,
      dutyDuration,
      jobTitle,
      salary,
      passport,
      issuedCountry,
      image,
      ...rest
    } = formData;

    if (
      !surname.trim() ||
      surname.trim().length < 3 ||
      surname.trim().length > 31
    ) {
      setError("Surname must be between 3 and 31 characters long.");
      setLoading(false);
      return;
    }

    if (
      !givenN.trim() ||
      givenN.trim().length < 3 ||
      givenN.trim().length > 31
    ) {
      setError("Given name must be between 3 and 31 characters long.");
      setLoading(false);
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!phone.trim() || !/^\d+$/.test(phone)) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    if (!nationalId.trim()) {
      setError("Please enter a valid national ID.");
      setLoading(false);
      return;
    }

    if (!sex.trim()) {
      setError("Please enter a valid sex.");
      setLoading(false);
      return;
    }

    if (!dob.trim()) {
      setError("Please enter a valid date of birth.");
      setLoading(false);
      return;
    }

    if (!birthCity.trim()) {
      setError("Please enter a valid birth city.");
      setLoading(false);
      return;
    }

    if (!currentN.trim()) {
      setError("Please enter a valid current nationality.");
      setLoading(false);
      return;
    }

    if (!identification.trim()) {
      setError("Please enter a valid identification.");
      setLoading(false);
      return;
    }

    if (!company.trim()) {
      setError("Please enter a valid company name.");
      setLoading(false);
      return;
    }

    if (!dutyDuration.trim()) {
      setError("Please enter a valid duty duration.");
      setLoading(false);
      return;
    }

    if (!jobTitle.trim()) {
      setError("Please enter a valid job title.");
      setLoading(false);
      return;
    }

    if (!salary.trim()) {
      setError("Please enter a valid salary.");
      setLoading(false);
      return;
    }

    if (!passport.trim()) {
      setError("Please enter a valid passport.");
      setLoading(false);
      return;
    }

    if (!issuedCountry.trim()) {
      setError("Please enter a valid issued country.");
      setLoading(false);
      return;
    }

    const userExistsEmail = applications.some((u) => u.email === email);
    const userExistsPassport = applications.some(
      (u) => u.passport === passport,
    );

    if (userExistsEmail) {
      setError("User email already exists. Please try another email.");
      setLoading(false);
      return;
    }

    if (userExistsPassport) {
      setError("User passport already exists. Please try another passport.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("surname", surname.trim());
      formDataToSend.append("givenN", givenN.trim());
      formDataToSend.append("email", email.trim());
      formDataToSend.append("phone", phone.trim());
      formDataToSend.append("nationalId", nationalId.trim());
      formDataToSend.append("sex", sex.trim());
      formDataToSend.append("dob", dob.trim());
      formDataToSend.append("birthCity", birthCity.trim());
      formDataToSend.append("currentN", currentN.trim());
      formDataToSend.append("identification", identification.trim());
      formDataToSend.append("company", company.trim());
      formDataToSend.append("dutyDuration", dutyDuration.trim());
      formDataToSend.append("jobTitle", jobTitle.trim());
      formDataToSend.append("salary", salary.trim());
      formDataToSend.append("passport", passport.trim());
      formDataToSend.append("issuedCountry", issuedCountry.trim());

      // Append the rest of the fields if they are not empty or null
      Object.keys(rest).forEach((key) => {
        if (formData[key] !== "" && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await api.post(
        `/application/addApplication`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response?.status === 201) {
        setFormData({
          surname: "",
          givenN: "",
          email: "",
          phone: "",
          nationalId: "",
          sex: "",
          dob: "",
          birthCity: "",
          currentN: "",
          identification: "",
          company: "",
          dutyDuration: "",
          jobTitle: "",
          salary: "",
          image: null,
          passport: "",
          issuedCountry: "",
        });

        navigate("/success", { replace: true });
        setError("");
      } else {
        setError(
          `Failed to add application. Server responded with status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error("Error adding application:", error);
      setError("Error adding application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJobChange = (e) => {
    const jobTitle = e.target.value;

    setFormData({
      ...formData,
      jobTitle: jobTitle,
      salary: jobSalaries[jobTitle] || "",
    });
  };

  return (
    <>
      <main
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        className="scrollspy-example add_user p-4"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
      >
        <div className="visa-header">
          <h2 className="visa_form">Visa Application Form</h2>
          <img src={enq} alt="logo" className="visa-logo" />
        </div>
        <p className="particulars">Personal Particulars</p>
        <hr className="user_application_hr " />
        <form
          onSubmit={handleSubmit}
          className="absolute "
          encType="multipart/form-data"
        >
          <div className="name-details d-flex">
            <div className="surname w-50 p-1">
              <label className="" htmlFor="surname">
                Surname*
              </label>
              <input
                className="form-control "
                type="text"
                name="surname"
                required
                value={formData.surname}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-50 p-1">
              <label className="" htmlFor="givenN">
                Given Name*
              </label>
              <input
                className="form-control"
                type="text"
                name="givenN"
                required
                value={formData.givenN}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div>
            <label className="" htmlFor="email">
              Email*
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="identification d-flex">
            <div className="phone-no w-50 p-1">
              <label className="" htmlFor="phone">
                Phone*
              </label>
              <input
                className="form-control"
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={onChangeHandler}
              />
            </div>
            <div className="id-number w-50 p-1">
              <label className="" htmlFor="nationalId">
                National ID*
              </label>
              <input
                className="form-control"
                type="text"
                name="nationalId"
                required
                value={formData.nationalId}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="gender_date d-flex">
            <div className="gender w-50 p-1">
              <label className="" htmlFor="sex">
                Sex*
              </label>
              <select
                id="sex"
                className="form-select "
                name="sex"
                value={formData.sex}
                required
                onChange={onChangeHandler}
              >
                <option value="" disabled>
                  Select Sex
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="dob w-50 p-1">
              <label className="" htmlFor="dob">
                Date of Birth*
              </label>
              <input
                className="form-control"
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="city_birth d-flex">
            <div className="w-50 p-1">
              <label className="" htmlFor="birthCity">
                Place of Birth Town/City*
              </label>
              <input
                className="form-control "
                type="text"
                name="birthCity"
                required
                value={formData.birthCity}
                onChange={onChangeHandler}
              />
            </div>
            <div className="id-number w-50 p-1">
              <label className="" htmlFor="currentN">
                Current Nationality*
              </label>
              <input
                className="form-control "
                type="text"
                name="currentN"
                required
                placeholder="Enter current nationality"
                value={formData.currentN}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="message">
            <label className="" htmlFor="identification">
              Identification Marks*
            </label>
            <textarea
              id="identification"
              name="identification"
              className="form-control"
              required
              placeholder="Enter identification marks" // <-- placeholder ব্যবহার
              value={formData.identification}
              onChange={onChangeHandler}
            />
          </div>
          <div className="company_duration d-flex">
            <div className="phone-no w-50 p-1">
              <label className="" htmlFor="company">
                Company Name*
              </label>
              <input
                className="form-control "
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={onChangeHandler}
              />
            </div>
            <div className="id-number w-50 p-1">
              <label className="" htmlFor="dutyDuration">
                Duty Duration*
              </label>
              <input
                className="form-control "
                type="text"
                name="dutyDuration"
                required
                value={formData.dutyDuration}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="d-flex job_title">
            <div className="w-50 p-1">
              <label className="" htmlFor="jobTitle">
                Job Title*
              </label>
              <select
                id="jobTitle"
                name="jobTitle"
                className="form-select "
                value={formData.jobTitle}
                onChange={handleJobChange}
                required
              >
                <option className="" value="" disabled>
                  Select Job Title
                </option>
                <option value="Food Paching">Food Paching</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Worker Security">Worker Security</option>
                <option value="Driver">Driver</option>
                <option value="Electrician">Electrician</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div className="id-number w-50 p-1">
              <label className="" htmlFor="salary">
                Salary*
              </label>
              <input
                className="form-control "
                type="text"
                name="salary"
                value={formData.salary}
                readOnly
              />
            </div>
          </div>
          <div className="edit-file">
            <label className="" htmlFor="image">
              Image
            </label>
            <input
              className="form-control "
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={onChangeHandler}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </div>
          <div className="id-number p-1">
            <label className="" htmlFor="passport">
              Passport*
            </label>
            <input
              className="form-control "
              type="text"
              name="passport"
              required
              value={formData.passport}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="" htmlFor="issuedCountry">
              Issued Country
            </label>
            <input
              className="form-control mb-4"
              type="text"
              name="issuedCountry"
              required
              placeholder="Enter issued country"
              value={formData.issuedCountry}
              onChange={onChangeHandler}
            />
            {error && <span style={{ color: "red" }}>{error}</span>}
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </>
  );
};

export default AddUserApplication;
