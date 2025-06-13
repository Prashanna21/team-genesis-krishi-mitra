import React, { useEffect, useState } from 'react';
import ContainerBox from '../components/ContainerBox';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Button} from '../components/ui/Button';
import axios from 'axios';


const sendDataToServer = async (data) => {
  console.log(data)
  try {
    const response = await axios.post('http://localhost:3000/report/generate-report', data);
    console.log("Server Response:", response.data);
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
};

const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const crops = ['Potato', 'Pepper', 'Soyabean', 'Tomato', 'Strawberry', 'Corn', 'Peach', 'Maize', 'Rice'];

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

function GenerateReportPage() {
  const [locationMode, setLocationMode] = useState('auto');
  const [manualPosition, setManualPosition] = useState(null);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [area, setArea] = useState('');
  const [season, setSeason] = useState(seasons[0]);
  const [crop, setCrop] = useState(crops[0]);
  const [autoPosition, setAutoPosition] = useState(null);

  useEffect(() => {
    if (locationMode === 'auto') {
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

  const handleSubmit = () => {
    const location = locationMode === 'manual' ? manualPosition : autoPosition;

    const reportData = {
      date,
      season,
      area: parseFloat(area),
      crop,
      locationMode,
      location,
    };
    sendDataToServer(reportData);
  };

  return (
    <div className="px-5">
      <ContainerBox customCSS={"px-10"}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Generate Report</h1>
          <p className="text-gray-800">Generate your report about the crops based on date, season, area, and location.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Season Selection */}
          <div>
            <label className="block font-medium mb-1 ml-2">Season</label>
            <select className="w-full p-2 border-2 rounded-sm" value={season} onChange={(e) => setSeason(e.target.value)}>
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
              className="w-full p-2 rounded border-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Area */}
          <div>
            <label className="block font-medium mb-1">Area (sq. feet)</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter area"
              className="w-full p-2 border-2 rounded"
            />
          </div>
        </div>

        {/* Location Selection */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Geolocation Selection</h3>
          <div className="flex items-center space-x-4 mb-4">
            <label>
              <input
                type="radio"
                value="auto"
                checked={locationMode === 'auto'}
                onChange={() => setLocationMode('auto')}
                className="mr-1"
              />
              Automatic
            </label>
            <label>
              <input
                type="radio"
                value="manual"
                checked={locationMode === 'manual'}
                onChange={() => setLocationMode('manual')}
                className="mr-1"
              />
              Manual
            </label>
          </div>

          {locationMode === 'manual' ? (
            <div className="w-full h-64 border rounded overflow-hidden">
              <MapContainer center={[28.3949, 84.1240]} zoom={7} className="w-full h-full">
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={manualPosition} setPosition={setManualPosition} />
              </MapContainer>
            </div>
          ) : (
            <div className="text-sm text-green-700">📍Using your device's current location</div>
          )}
        </div>

        {/* Crop Selection */}
        <div className="mt-8">
          <label className="block font-medium mb-1">Crop Type</label>
          <select className="w-full p-2 border rounded" value={crop} onChange={(e) => setCrop(e.target.value)}>
            {crops.map((crop) => (
              <option key={crop}>{crop}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleSubmit}
            className="text-md"
          >
            Generate Report
          </Button>
        </div>

        {/* Recommendations */}
        <div className="mt-10">
          <h4 className="text-xl font-semibold mb-2">🌱 Crop Recommendations</h4>
          <p className="text-gray-600 mb-4">Based on your selected inputs, here are some crops suitable for your region and season.</p>
          <ul className="list-disc list-inside text-gray-800">
            <li>Tomato – best in spring and warm climates</li>
            <li>Rice – ideal for high humidity and summer monsoon</li>
            <li>Strawberry – prefers cooler temperature</li>
          </ul>
        </div>
      </ContainerBox>
    </div>
  );
}

export default GenerateReportPage;
