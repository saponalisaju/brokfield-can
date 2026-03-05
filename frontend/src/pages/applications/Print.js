import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = forwardRef(({ application }, ref) => {
  const { file1 } = application || {};

  if (!file1) {
    return <div ref={ref}>File data is missing or undefined.</div>;
  }

  const fileExtension = file1.toString().split(".").pop().toLowerCase();

  return (
    <div ref={ref}>
      {fileExtension === "pdf" ? (
        <iframe
          style={{ width: "100%", height: "500px" }}
          src={file1}
          title="PDF viewer"
        />
      ) : (
        <img style={{ width: "100%" }} src={file1} alt="attachment" />
      )}
    </div>
  );
});

const Print = ({ application }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  return (
    <div>
      <button
        className="btn btn-outline-info mb-3 btn-sm"
        onClick={handlePrint}
      >
        Print
      </button>
      <div>
        <ComponentToPrint ref={contentRef} application={application} />
      </div>
    </div>
  );
};

export default Print;
