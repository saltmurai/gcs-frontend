import { GiDeliveryDrone } from "react-icons/gi";
import Map, { Marker, Source, Layer } from "react-map-gl";
import convertToGeoJSON from "@/utils/map";
import React, { use, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveDrones } from "@/api/api";

const colors = ["red", "yellow", "amber", "yellow", "green"];

const DroneMarker = ({
  size = 35,
  color = "blue",
}: {
  size?: number;
  color?: string;
}) => {
  return <GiDeliveryDrone size={size} className={`text-${color}-500`} />;
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
  const [messages, setMessages] = useState<any[]>([]);
  const { data, isLoading } = useQuery(["activeDrone"], getActiveDrones, {
    refetchInterval: 500,
  });
  const [drones, setDrones] = useState<any>();
  const [coordinateIndex, setCoordinateIndex] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3003");

    socket.onopen = () => {
      console.log("connected");
    };
    socket.onmessage = (e) => {
      const socketData = JSON.parse(e.data);

      if (messages.length > 1000) {
        setMessages((prev) => prev.slice(1));
      } else {
        setMessages((prev) => [...prev, socketData]);
      }
    };
    socket.onclose = () => {
      console.log("disconnected");
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Map
      initialViewState={{
        longitude: 8.545593799999999,
        latitude: 47.3977419,
        zoom: 20,
      }}
      mapStyle={"mapbox://styles/mapbox/dark-v11"}
      mapboxAccessToken="pk.eyJ1Ijoic2FsdG11cmFpIiwiYSI6ImNsaTJ6cmE3bDJjbnEzY213ZTMwNWdkOGcifQ.c7JQWGP9Ak1a7t9OzQa89g"
    >
      {/* @ts-ignore */}
      {data?.map((drone: any, index: number) => {
        const position = JSON.parse(drone.Position);
        return (
          <Marker
            key={drone.ID}
            longitude={position.longitude_deg}
            latitude={position.latitude_deg}
          >
            <DroneMarker color={colors[index]} />
          </Marker>
        );
      })}
      {/* <Marker longitude={longitude} latitude={latitude}>
        <DroneMarker />
      </Marker> */}
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
