import React from "react";

const SpinnerPage = () => {
  return (
    <>
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow spinner-grow-sm" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </>
  );
}

export default SpinnerPage;