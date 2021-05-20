import React from "react";

const SpinnerPage = () => {
  return (
    <>
      <div className="spinner-border spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow spinner-grow-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>

      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

export default SpinnerPage;