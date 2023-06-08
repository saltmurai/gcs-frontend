import { GiDeliveryDrone } from "react-icons/gi";
import Map, { Marker, Source, Layer } from "react-map-gl";
import convertToGeoJSON from "@/utils/map";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const DroneMarker = () => {
  return <GiDeliveryDrone size={35} className="text-blue-500" />;
};

const coordinates = [
  [105.84212921674695, 21.005859155053443],
  [105.84140586853027, 21.006549352114527],
  [105.84110736846924, 21.0062066988205],
  [105.8420147895813, 21.005987019085254],
  [105.84219789505005, 21.00645791598784],
];

const geoJSON = convertToGeoJSON(coordinates);
const DroneMap = () => {
  const [coordinateIndex, setCoordinateIndex] = useState(0);
  const [longitude, setLongitude] = useState(coordinates[0][0]);
  const [latitude, setLatitude] = useState(coordinates[0][1]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinateIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex >= coordinates.length) {
          clearInterval(interval);
          return prevIndex;
        } else {
          const newLongitude = coordinates[newIndex][0];
          const newLatitude = coordinates[newIndex][1];
          setLongitude(newLongitude);
          setLatitude(newLatitude);
          return newIndex;
        }
      });
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: 105.84212921674695,
        latitude: 21.005859155053443,
        zoom: 15,
      }}
      mapStyle={"mapbox://styles/mapbox/dark-v11"}
      mapboxAccessToken="pk.eyJ1Ijoic2FsdG11cmFpIiwiYSI6ImNsaTJ6cmE3bDJjbnEzY213ZTMwNWdkOGcifQ.c7JQWGP9Ak1a7t9OzQa89g"
    >
      <Marker longitude={longitude} latitude={latitude}>
        <DroneMarker />
      </Marker>
      <Source id="drone" type="geojson" data={geoJSON}>
        <Layer
          id="drone"
          type="line"
          paint={{
            "line-color": "#ff0000",
            "line-width": 5,
          }}
          filter={["==", "$type", "LineString"]}
        />
        <Layer
          id="point"
          type="circle"
          paint={{
            "circle-radius": 6,
            "circle-color": "#ff0000",
          }}
          filter={["==", "$type", "Point"]}
        />
      </Source>
    </Map>
  );
};

export default DroneMap;
