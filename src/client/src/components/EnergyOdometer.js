import React from 'react';

const EnergyOdometer = ({ energy, odo }) => (
  <div className="row">
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Energy</h5>
          <p>{energy[0]} kW</p>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Odometer</h5>
          <p>{odo[0]} km</p>
        </div>
      </div>
    </div>
  </div>
);

export default EnergyOdometer;
