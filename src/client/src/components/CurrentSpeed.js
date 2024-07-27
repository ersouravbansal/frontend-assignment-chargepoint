import React from "react";

const CurrentSpeed = ({ speed }) => (
  <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">Current Speed</h5>
      <div className="progress no-border-radius">
        <div
          className="progress-bar bg-secondary"
          role="progressbar"
          style={{ width: `${speed[0]}%` }}
          aria-valuenow={speed[0]}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {isNaN(speed[0]) ? "0 km/h" : `${speed[0]} km/h`}
        </div>
      </div>
    </div>
  </div>
);

export default CurrentSpeed;
