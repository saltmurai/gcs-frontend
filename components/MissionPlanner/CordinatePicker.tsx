import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";

type point = 1 | 2 | 3 | 4;

type Point = {
  lat: number;
  lng: number;
};
const initCordinates: Point = {
  lat: 21.005859155053443,
  lng: 105.84212921674695,
};

export default function CordinatePicker({
  onWaypointChange,
  choosePoint,
  switchPoint,
}: {
  onWaypointChange: (e: any) => void;
  choosePoint: point;
  switchPoint: (point: point) => void;
}) {
  const [PointA, setPointA] = useState<Point | undefined>();
  const [PointB, setPointB] = useState<Point | undefined>();
  const [PointC, setPointC] = useState<Point | undefined>();
  const [currentPos, setCurrentPos] = useState<Point | undefined>(
    initCordinates
  );

  function hanldelClickMap(e: any) {
    const lnglat = e.lngLat;
    switch (choosePoint) {
      case 1:
        setPointA({ lat: lnglat.lat, lng: lnglat.lng });
        break;
      case 2:
        setPointB({ lat: lnglat.lat, lng: lnglat.lng });

        break;
      case 3:
        setPointC({ lat: lnglat.lat, lng: lnglat.lng });
        break;
      default:
        break;
    }
  }
  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: initCordinates.lng,
        latitude: initCordinates.lat,
        zoom: 14,
      }}
      onClick={(e: any) => {
        onWaypointChange(e);
      }}
      onMouseMove={(e: any) => {
        setCurrentPos({ lat: e.lngLat.lat, lng: e.lngLat.lng });
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=3fzb5U4yydF2pqQIBClw "
    >
      {/* <Marker longitude={lnglat[0]} latitude={lnglat[1]}></Marker> */}
      {PointA && (
        <Marker
          longitude={PointA.lng}
          latitude={PointA.lat}
          onClick={() => {
            switchPoint(1);
          }}
        >
          <AiFillHome
            size={30}
            className="text-green-500 shadow-lg hover:text-green-600 transition-all"
          />
        </Marker>
      )}
      {PointB && (
        <Marker
          longitude={PointB.lng}
          latitude={PointB.lat}
          onClick={() => {
            switchPoint(2);
          }}
          color="#ff0000"
        ></Marker>
      )}
      {PointC && (
        <Marker
          longitude={PointC.lng}
          latitude={PointC.lat}
          onClick={() => {
            switchPoint(3);
          }}
        ></Marker>
      )}
      <NavigationControl position="top-left" />
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <div className="absolute top-0 right-0 bg-slate-300 opacity-80 rounded-md w-72 h-60 flex flex-col">
        <div className="flex-1">
          <div>
            Current Position: {currentPos?.lat}, {currentPos?.lng}
          </div>
          <div>
            Point 1: {PointA?.lat}, {PointA?.lng}
          </div>
          <div>
            Point 2: {PointB?.lat}, {PointB?.lng}
          </div>
          <div>
            Point 3: {PointC?.lat}, {PointC?.lng}
          </div>
        </div>
        <div className="w-full flex justify-around">
          <button
            className="btn btn-xs btn-primary"
            onClick={() => switchPoint(1)}
          >
            Set Point 1
          </button>
          <button
            className="btn btn-xs btn-primary px-1"
            onClick={() => switchPoint(2)}
          >
            Set Point 2
          </button>
          <button
            className="btn btn-xs btn-primary"
            onClick={() => switchPoint(3)}
          >
            Set Point 3
          </button>
        </div>
      </div>
    </Map>
  );
}
