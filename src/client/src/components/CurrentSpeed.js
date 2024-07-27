import React from "react";

const CurrentSpeed = ({ speed = [] }) => {
  const currentSpeed = speed.length ? speed[speed.length - 1] : 0;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Current Speed</h5>
        <div className="progress no-border-radius">
          <div
            className="progress-bar bg-secondary"
            role="progressbar"
            style={{ width: `${currentSpeed}%` }}
            aria-valuenow={currentSpeed}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {isNaN(currentSpeed) ? "0 km/h" : `${currentSpeed} km/h`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSpeed;
