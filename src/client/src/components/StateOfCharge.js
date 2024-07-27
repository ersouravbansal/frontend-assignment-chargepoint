import React from 'react';

const StateOfCharge = ({ soc = [0] }) => {
  const socValue = Math.max(0, Math.min(soc[0], 100)); 

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