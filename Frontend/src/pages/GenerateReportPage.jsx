import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReportData } from "../app/infoSlice";

const sendDataToServer = async (data, setLoading, navigate, dispatch) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:3000/report/generate-report",
      data
    );

    console.log("Server Response:", response.data);

    setLoading(false);

    dispatch(addReportData(response.data));

    navigate("/report");
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
};

const sendMapDataToServer = async (lat, lng, setCropLandError) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/report/is-crop-land?lat=${lat}&lng=${lng}`
    );
    console.log("Map Data Response:", response.data.result);
    if (response.data.result == "Please select the crop land") {
      setCropLandError("This is not a crop land");
    } else {
      setCropLandError("");
    }
  } catch (error) {
    console.error("Error sending map data to server:", error);
  }
};

const seasons = ["Spring", "Summer", "Autumn", "Winter"];

const LocationMarker = ({ position, setPosition, setCropLandError }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      sendMapDataToServer(e.latlng.lat, e.latlng.lng, setCropLandError);
    },
  });

  return position ? <Marker position={position} /> : null;
};

function GenerateReportPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationMode, setLocationMode] = useState("auto");
  const [manualPosition, setManualPosition] = useState(null);
  const dispatch = useDispatch();

  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [area, setArea] = useState("");
  const [season, setSeason] = useState(seasons[0]);
  const [autoPosition, setAutoPosition] = useState(null);
  const [cropLandError, setCropLandError] = useState("");

  useEffect(() => {
    if (locationMode === "auto") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setAutoPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, [locationMode]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const location = locationMode === "manual" ? manualPosition : autoPosition;

    const reportData = {
      date,
      season,
      area: parseFloat(area),
      locationMode,
      location,
    };
    sendDataToServer(reportData, setLoading, navigate, dispatch);
  };

  return (
    <section className="w-full min-h-[calc(100vh-4.5rem)] grid md:grid-cols-2 grid-cols-1">
      <div
        className="w-full bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url("/potato.jpg")` }}
      >
        <div className="w-full bg-emerald-950/80 absolute z-0 top-0 bottom-0"></div>
        <div className="w-full max-w-110 p-4 text-4xl text-white z-10 font-bold">
          <h1>Find The Best Possible Crop to Grow </h1>
        </div>
      </div>
      <form
        className="w-full flex flex-col justify-center p-8 mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Season Selection */}
        <div className="w-full flex flex-col gap-4 max-w-xl mx-auto">
          <div className="w-full">
            <label className="block font-medium mb-1 ml-2">Season</label>
            <select
              className="w-full p-2 border-2 rounded-sm"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              {seasons.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full p-2 rounded border-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Area */}
          <div>
            <label className="block font-medium mb-1">Area (sq. meter)</label>
            <input
              type="number"
              value={area}
              required
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter area"
              className="w-full p-2 border-2 rounded"
            />
          </div>
          {/* Location Selection */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">
              Geolocation Selection
            </h3>
            <div className="flex items-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setLocationMode("auto")}
                className={`p-2 px-4 border-3 font-semibold cursor-pointer rounded-xl transition-all duration-300 hover:scale-105 ${
                  locationMode === "auto"
                    ? "border-blue-500 text-blue-500 shadow-xl"
                    : "border-slate-400 text-slate-600"
                }`}
              >
                Automatic
              </button>
              <button
                type="button"
                onClick={() => setLocationMode("manual")}
                className={`p-2 px-4 border-3 font-semibold cursor-pointer rounded-xl transition-all duration-300 hover:scale-105 ${
                  locationMode === "manual"
                    ? "border-blue-500 text-blue-500 shadow-xl"
                    : "border-slate-400 text-slate-600"
                }`}
              >
                Manual
              </button>
            </div>

            {locationMode === "manual" ? (
              <div>
                <div className="w-full h-64 border rounded overflow-hidden relative z-0">
                  <MapContainer
                    center={[28.3949, 84.124]}
                    zoom={7}
                    className="w-full h-full"
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                      position={manualPosition}
                      setPosition={setManualPosition}
                      setCropLandError={setCropLandError}
                    />
                  </MapContainer>
                </div>
                <div>{cropLandError} </div>
              </div>
            ) : (
              <div className="text-sm text-green-700">{cropLandError}</div>
            )}
            <div className="pt-4">
              <button
                className={`text-white cursor-pointer rounded-xl bg-slate-950 p-2 px-4 transition-all duration-300 hover:bg-black text-md`}
              >
                {loading ? "loading... " : "Generate Report"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default GenerateReportPage;
