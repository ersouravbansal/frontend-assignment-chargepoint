import React from "react";

const EnergyOdometer = ({ energy = [], odo = [] }) => (
  <div className="row">
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Energy</h5>
          <p>{energy.length ? `${energy[energy.length - 1]} kW` : "N/A"}</p>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Odometer</h5>
          <p>{odo.length ? `${odo[odo.length - 1]} km` : "N/A"}</p>
        </div>
      </div>
    </div>
  </div>
);

export default EnergyOdometer;
