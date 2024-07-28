import React, { useState, useEffect, useRef } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SpeedChart from "./components/SpeedChart";
import SocChart from "./components/SocChart";
import MapView from "./components/MapView";
import CurrentSpeed from "./components/CurrentSpeed";
import StateOfCharge from "./components/StateOfCharge";
import EnergyOdometer from "./components/EnergyOdometer";

// Constants
const MAX_LENGTH = 50;

const App = () => {
  const [time, setTime] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [odo, setOdo] = useState([]);
  const [speed, setSpeed] = useState([]);
  const [soc, setSoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overspeedAlert, setOverspeedAlert] = useState(false);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const alertTimeoutRef = useRef(null);


  const connectWebSocket = () => {
    wsRef.current = new WebSocket("ws://localhost:8080/ws");

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "data") {
        updateData(message.payload);
        setLoading(false);
      } else if (message.type === "overspeed") {
        setOverspeedAlert(true);
        updateData(message.payload);
        if (alertTimeoutRef.current) {
          clearTimeout(alertTimeoutRef.current);
        }
        alertTimeoutRef.current = setTimeout(
          () => setOverspeedAlert(false),
          1000
        );
      }
    };

    wsRef.current.onerror = () => {
      if (wsRef.current.readyState !== WebSocket.OPEN) {
        wsRef.current.close();
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 1000);
      }
    };

    wsRef.current.onclose = () => {
      if (!error) {
        setError("WebSocket connection closed");
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, 1000);
    };
  };

  const updateData = (newData) => {
    setCurrentPosition(newData.gps.split("|").map(parseFloat));

    setTime((prevTime) => [
      ...prevTime.slice(-MAX_LENGTH + 1),
      new Date(newData.time).toLocaleTimeString(),
    ]);

    setEnergy((prevEnergy) => [
      ...prevEnergy.slice(-MAX_LENGTH + 1),
      newData.energy,
    ]);

    setOdo((prevOdo) => [
      ...prevOdo.slice(-MAX_LENGTH + 1),
      newData.odo,
    ]);

    setSpeed((prevSpeed) => [
      ...prevSpeed.slice(-MAX_LENGTH + 1),
      newData.speed,
    ]);

    setSoc((prevSoc) => [
      ...prevSoc.slice(-MAX_LENGTH + 1),
      newData.soc,
    ]);
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="container mt-4">
        <h1 className="mb-4">Vehicle Data</h1>
        <div className="row mb-4">
          <div className="col-md-6 d-flex flex-column">
            <div className="card flex-fill mb-4">
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <MapView currentPosition={currentPosition} />
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column">
            <div className="card flex-fill mb-4">
              <div className="card-body">
                <CurrentSpeed speed={speed} overspeedAlert={overspeedAlert} />
                <StateOfCharge soc={soc} />
                <EnergyOdometer energy={energy} odo={odo} />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <SpeedChart time={time} speed={speed} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <SocChart time={time} soc={soc} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
