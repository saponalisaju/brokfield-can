import React from "react";
import "../../assets/styles/main.css";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import moment from "moment";

const ViewOne = () => {
  const location = useLocation();

  // Safe state access
  const applications = location?.state?.applications || [];

  // If empty
  if (!Array.isArray(applications) || applications.length === 0) {
    return <div className="text-center p-5">No application data found.</div>;
  }

  const handlePrint = () => {
    const printableDiv = document.getElementById("printableArea");

    if (!printableDiv) return;

    const printableContent = printableDiv.innerHTML;

    const newWindow = window.open("", "_blank");

    newWindow.document.write(`
      <html>
      <head>
        <title>Print</title>
        <style>
          @media print{
            size: A4;
            margin:0;
            button{display:none;}
          }

          .view_one{
            width:100%;
            font-size:1.2rem;
          }

          .user_image{
            width:120px;
            height:160px;
          }

          .head_image{
            display:flex;
          }
        </style>
      </head>

      <body>
        ${printableContent}
      </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger ms-auto btn-sm m-1"
        onClick={handlePrint}
      >
        Print
      </button>

      <main
        className="view_one_top"
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
      >
        <div id="printableArea">
          <ul className="view_one_body m-0 p-1">
            {applications.map((application) => {
              const formattedDate = application?.dob
                ? moment(application.dob).format("YYYY-MM-DD")
                : "";

              return (
                <li
                  className="border border-1 m-0 p-0"
                  key={application._id || Math.random()}
                >
                  <h2 className="view_one_head pb-3">
                    Applicants Copy ({application?.isStatus || ""})
                  </h2>

                  <div className="view_one_main">
                    <div className="me-auto d-flex head_image">
                      <div className="d-flex">
                        {application?.image ? (
                          <img
                            className="user_image p-2"
                            src={application.image}
                            alt="Applicant"
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>

                      <img className="logo_p" src={logo} alt="logo" />
                    </div>

                    <div className="border border-2 view_one">
                      <h2 className="fw-bold text-center text-uppercase py-2 m-0">
                        {application?.surname} {application?.givenN}
                      </h2>

                      <h4 className="bg_headline py-2 m-0">
                        A. Personal Particulars
                      </h4>

                      <div className="surname_given">
                        <div className="d-flex">
                          <strong className="border surname_one">
                            Surname
                          </strong>
                          <span className="border surname_result_one">
                            {application?.surname}
                          </span>
                        </div>

                        <div className="d-flex">
                          <strong className="border surname_one">
                            Given Name
                          </strong>
                          <span className="border surname_result_one">
                            {application?.givenN}
                          </span>
                        </div>

                        <div className="d-flex">
                          <strong className="border surname_sex_one">
                            Sex
                          </strong>
                          <span className="border surname_sex">
                            {application?.sex}
                          </span>
                        </div>

                        <div className="d-flex">
                          <strong className="border surname_sex_one">
                            Date of Birth
                          </strong>
                          <span className="border surname_sex">
                            {formattedDate}
                          </span>
                        </div>
                      </div>

                      <h4 className="bg_headline py-2 m-0">
                        B. Company Details
                      </h4>

                      <div className="d-flex">
                        <strong className="border surname_sex_one">
                          Company Name
                        </strong>
                        <span className="border surname_sex">
                          {application?.company}
                        </span>
                      </div>

                      <div className="d-flex">
                        <strong className="border surname_sex_one">
                          Job Title
                        </strong>
                        <span className="border surname_sex">
                          {application?.jobTitle}
                        </span>
                      </div>

                      <h4 className="bg_headline">C. Passport Details</h4>

                      <div className="d-flex">
                        <strong className="border surname_sex_one">
                          Passport No
                        </strong>
                        <span className="border surname_sex">
                          {application?.passport}
                        </span>
                      </div>

                      <div className="d-flex">
                        <strong className="border surname_sex_one">
                          Issued Country
                        </strong>
                        <span className="border surname_sex">
                          {application?.issuedCountry}
                        </span>
                      </div>
                    </div>

                    <div className="image_display">
                      <h1>Documents:</h1>

                      <ul className="multiple_file m-0 p-0">
                        {Array.isArray(application?.file1) &&
                          application.file1.map((file, index) => (
                            <li key={index}>
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
                </li>
              );
            })}
          </ul>
        </div>

        <div className="footer text-center">
          <p className="footer_area">
            Copyright © {new Date().getFullYear()} Canada Works Visa
          </p>
        </div>
      </main>
    </>
  );
};

export default ViewOne;
