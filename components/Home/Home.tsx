//@ts-ignore
import mapboxgl from "!mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { GiDeliveryDrone } from "react-icons/gi";
import "mapbox-gl/dist/mapbox-gl.css";
import LeftBar from "./LeftBar";
import DroneMap from "./DroneMap";
import { useQuery } from "@tanstack/react-query";
import { resetDrones } from "@/api/api";
import { useTelemetryContext } from "@/contexts/TelemetryProvider";
import { Button } from "@mantine/core";
const DroneMarker = () => {
  return <GiDeliveryDrone size={35} className="text-red-400" />;
};

export default function Home() {
  const { socket, restartWebSocket } = useTelemetryContext();
  // const { data } = useQuery(["resetDrones"], resetDrones, {
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: false,
  // });
  return (
    <div className="flex bg-slate-200 flex-1 gap-2 max-h-screen">
      <div className="flex-1 bg-white rounded-md">
        <DroneMap />
      </div>
      <div className="w-1/3 bg-white rounded-md">
        <LeftBar />
      </div>
    </div>
  );
}
