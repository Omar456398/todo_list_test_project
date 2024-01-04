import React from "react";

function ErrorMsg({ onClick = () => {} }) {
  return (
    <div className="error_container">
      An Error Occured, Press Retry <br /><br />
      <div className="retry_btn_container">
        <div className="retry_btn_border1">
          <div className="retry_btn_border2">
            <div className="retry_btn_border3">
              <button className="retry_btn" onClick={onClick}>
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMsg;
