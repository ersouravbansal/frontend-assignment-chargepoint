import React from 'react';

const StateOfCharge = ({ soc = [] }) => {
  const socValue = soc.length ? Math.round(Math.max(0, Math.min(soc[soc.length - 1], 100))) : 0;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">State of Charge</h5>
        <div className="progress no-border-radius">
          <div
            className="progress-bar bg-secondary"
            role="progressbar"
            style={{ width: `${socValue}%`}}
            aria-valuenow={socValue}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {isNaN(socValue) ? 0 : socValue}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateOfCharge;
