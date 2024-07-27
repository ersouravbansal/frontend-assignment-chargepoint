import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  Suspense,
  lazy,
} from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Lazy loading components
const SpeedChart = lazy(() => import("./components/SpeedChart"));
const SocChart = lazy(() => import("./components/SocChart"));
const MapView = lazy(() => import("./components/MapView"));
const CurrentSpeed = lazy(() => import("./components/CurrentSpeed"));
const StateOfCharge = lazy(() => import("./components/StateOfCharge"));
const EnergyOdometer = lazy(() => import("./components/EnergyOdometer"));

const App = () => {
  const [data, setData] = useState({
    time: [],
    energy: [],
    gps: [],
    odo: [],
    speed: [],
    soc: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const connectWebSocket = () => {
    wsRef.current = new WebSocket("ws://localhost:8080/ws");

    wsRef.current.onmessage = (event) => {
      const message = event.data;
      if (message.startsWith("{") || message.startsWith("[")) {
        try {
          const incomingData = JSON.parse(event.data);

          setData((prevData) => ({
            time: [
              ...prevData.time,
              new Date(incomingData.time).toLocaleTimeString(),
            ],
            energy: [...prevData.energy, incomingData.energy],
            gps: [...prevData.gps, incomingData.gps],
            odo: [...prevData.odo, incomingData.odo],
            speed: [...prevData.speed, incomingData.speed],
            soc: [...prevData.soc, incomingData.soc],
          }));

          setLoading(false);
        } catch (error) {
          setError(error);
        }
      } else if (message.includes("Connected to WebSocket server!")) {
        console.log("Connected to WebSocket server!");
      } else {
        console.log("Received non-JSON message:", message);
      }
    };

    wsRef.current.onerror = () => {
      if (wsRef.current.readyState !== WebSocket.OPEN) {
        wsRef.current.close();
        setTimeout(connectWebSocket, 1000);
      }
    };

    wsRef.current.onclose = () => {
      if (!error) {
        setError("WebSocket connection closed");
      }
      setTimeout(connectWebSocket, 1000);
    };
  };
  const chartData = useMemo(() => {
    if (loading) return <div>Loading...</div>;
    if (!data.time.length) return <div>No data available</div>;

    return (
      <div className="row mt-4">
        <div className="col-md-6">
          <Suspense fallback={<div>Loading Speed Chart...</div>}>
            <SpeedChart time={data.time} speed={data.speed} />
          </Suspense>
        </div>
        <div className="col-md-6">
          <Suspense fallback={<div>Loading SOC Chart...</div>}>
            <SocChart time={data.time} soc={data.soc} />
          </Suspense>
        </div>
      </div>
    );
  }, [data, loading]);
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [error]);
  return (
    <ErrorBoundary>
      <div className="container mt-4">
        <h1 className="mb-4">Vehicle Data</h1>
        <div className="row mb-4">
          <div className="col-md-6 d-flex flex-column">
            <div className="card flex-fill mb-4">
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <Suspense fallback={<div>Loading Map View...</div>}>
                  <MapView gps={data.gps} />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column">
            <div className="card flex-fill mb-4">
              <div className="card-body">
                <Suspense fallback={<div>Loading Current Speed...</div>}>
                  <CurrentSpeed speed={data.speed} />
                </Suspense>
                <Suspense fallback={<div>Loading State of Charge...</div>}>
                  <StateOfCharge soc={data.soc} />
                </Suspense>
                <Suspense fallback={<div>Loading Energy Odometer...</div>}>
                  <EnergyOdometer energy={data.energy} odo={data.odo} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        {chartData}
      </div>
    </ErrorBoundary>
  );
};

export default App;
