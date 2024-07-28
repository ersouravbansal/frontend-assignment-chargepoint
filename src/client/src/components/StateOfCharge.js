import React from 'react';

const getColor = (value) => {
  if (value <= 30) return '#FF0000'; 
  if (value <= 55) return '#FF7F00';
  if (value <= 80) return '#7FFF00'; 
  return '#00FF00'; 
};

const StateOfCharge = ({ soc = [] }) => {
  const socValue = soc.length ? Math.round(Math.max(0, Math.min(soc[soc.length - 1], 100))) : 0;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">State of Charge</h5>
        <div className="progress no-border-radius">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${socValue}%`,
              backgroundColor: getColor(socValue),
              transition: 'width 0.5s ease, background-color 0.5s ease',
            }}
            aria-valuenow={socValue}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span
              className="progress-bar-text spd_soc-text"
            >
              {isNaN(socValue) ? 0 : socValue}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateOfCharge;
