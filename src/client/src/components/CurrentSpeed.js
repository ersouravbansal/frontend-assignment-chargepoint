import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const getColor = (speed) => (speed < 30 ? "#00FF00" : "#FF0000");

const CurrentSpeed = ({ speed = [], overspeedAlert = false }) => {
  const [alertVisible, setAlertVisible] = useState(overspeedAlert);
  const currentSpeed = speed.length ? speed[speed.length - 1] : 0;

  useEffect(() => {
    if (overspeedAlert) {
      console.log("overspeeding")
      setAlertVisible(true);
      const timer = setTimeout(() => setAlertVisible(false), 1000); 
      return () => clearTimeout(timer);
    }
  }, [overspeedAlert]);

  return (
    <div className="card mb-4">
      <div className="card-body position-relative">
        <h5 className="card-title">Current Speed</h5>
        {alertVisible && (
          <div className="alert alert-danger alert-dismissible fade show position-absolute align-rt alt-fmt" role="alert">
            <strong>Warning!</strong> Speed Alert! is above 30 km/h.
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertVisible(false)}></button>
          </div>
        )}
        <div className="progress no-border-radius mt-3">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${Math.min(currentSpeed, 100)}%`,
              backgroundColor: getColor(currentSpeed),
            }}
            aria-valuenow={currentSpeed}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span className="progress-bar-text spd_soc-text">
              {isNaN(currentSpeed) ? "0 km/h" : `${currentSpeed} km/h`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSpeed;
