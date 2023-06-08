//@ts-ignore
import mapboxgl from "!mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { GiDeliveryDrone } from "react-icons/gi";
import "mapbox-gl/dist/mapbox-gl.css";
import DroneMap from "./DroneMap";
const DroneMarker = () => {
  return <GiDeliveryDrone size={35} className="text-red-400" />;
};

export default function Home() {
  const [longitude, setLongitude] = useState(105.84212921674695);
  const [latitude, setLatitude] = useState(21.005859155053443);

  return (
    <div className="flex bg-slate-200 flex-1 gap-2">
      <div className="flex-1 bg-white rounded-md">
        <DroneMap />
      </div>
      <div className="w-1/3 bg-white rounded-md">BAR</div>
    </div>
  );
}
