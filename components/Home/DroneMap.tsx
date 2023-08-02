import { MdNavigation } from "react-icons/md";
import Map, { Marker, Source, Layer } from "react-map-gl";
import convertToGeoJSON from "@/utils/map";
import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useQuery } from "@tanstack/react-query";
import { getActiveDrones, resetDrones } from "@/api/api";
import { useTelemetryContext } from "@/contexts/TelemetryProvider";
import { TfiReload } from "react-icons/tfi";
import { Menu, Select } from "@mantine/core";

const colors = ["red", "green", "amber", "yellow", "green"];

const DroneMarker = ({
  size = 50,
  color = "blue",
  rotation = 30,
}: {
  size?: number;
  color?: string;
  rotation?: number;
}) => {
  return (
    <MdNavigation
      size={size}
      className={`text-${color}-500`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.3s ease-in-out",
      }}
    />
  );
};

const DroneMap = () => {
  const { socket, restartWebSocket, mission_items } = useTelemetryContext();
  const [choosenDrone, setChoosenDrone] = useState(0);
  const { data, isLoading } = useQuery(["activeDrone"], getActiveDrones, {
    refetchInterval: 1000,
  });

  function sendAction(action: string) {
    socket?.send(
      JSON.stringify({
        action: action,
        drone_id: data[choosenDrone].ID,
        system_address: data[choosenDrone].Address,
        port: data[choosenDrone].Port,
      })
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  function renderData() {
    if (data) {
      return data.map((drone: any, index: number) => {
        const position = JSON.parse(drone.Position);
        const heading_deg = JSON.parse(drone.HeadingDeg).heading_deg;
        return (
          <Marker
            key={drone.ID}
            longitude={position.longitude_deg}
            onClick={() => setChoosenDrone(index)}
            latitude={position.latitude_deg}
          >
            <DroneMarker color={colors[index]} rotation={heading_deg} />
          </Marker>
        );
      });
    }

    return <></>;
  }
  function renderSelect() {
    if (data) {
      return (
        <Select
          data={data.map((drone: any, index: any) => ({
            value: index,
            label: drone.Name,
          }))}
          defaultValue={`${choosenDrone}`}
          onChange={(value) => {
            if (value !== null) {
              console.log(value);
              setChoosenDrone(parseInt(value));
            }
          }}
        />
      );
    }
  }
  function renderDroneInfo() {
    if (data[choosenDrone]) {
      const drone = data[choosenDrone];
      const position = JSON.parse(drone.Position);
      const battery = JSON.parse(drone.Battery);
      const { flight_mode } = JSON.parse(drone.FlightMode);
      return (
        <div className="flex flex-col text-left px-2" key={drone.id}>
          <div className="text-lg font-bold text-center">{drone.Name}</div>
          <div className="text-sm">
            <span className="font-bold">Flight Mode: </span> {flight_mode}
          </div>
          <div className="text-sm">
            <span className="font-bold">Battery: </span>{" "}
            {battery.remaining_percent * 100}%
          </div>
          <div className="text-sm">
            <span className="font-bold">Relative Altitude: </span>{" "}
            {position.relative_altitude_m} m
          </div>
          <div className="text-sm">
            <span className="font-bold">Absolute Altitude: </span>
            {position.absolute_altitude_m} m
          </div>
          <div className="text-sm">
            <span className="font-bold">Lat, long: </span>
            {position.latitude_deg}, {position.longitude_deg}{" "}
          </div>
          <div className="flex gap-2 items-center mt-3 justify-center">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <div className="btn">Action</div>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => sendAction("arm")}>Arm</Menu.Item>
                <Menu.Item onClick={() => sendAction("start_mission")}>
                  Start Mission
                </Menu.Item>
                <Menu.Item onClick={() => sendAction("download_mission")}>
                  Download Mission
                </Menu.Item>
                <Menu.Item onClick={() => sendAction("disarm")}>
                  Disarm
                </Menu.Item>
                <Menu.Item onClick={() => sendAction("takeoff")}>
                  Takeoff
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Emergency action</Menu.Label>
                <Menu.Item
                  color="red"
                  onClick={() => sendAction("return_home")}
                >
                  Return home
                </Menu.Item>
                <Menu.Item color="red" onClick={() => sendAction("land")}>
                  Land
                </Menu.Item>
                <Menu.Item color="red" onClick={() => sendAction("kill")}>
                  Kill
                </Menu.Item>
                <Menu.Item color="red" onClick={() => sendAction("reboot")}>
                  Reboot
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      );
    }
  }
  function renderGeoJSON() {
    if (mission_items.length > 0) {
      return mission_items.map((mission_item: any) => {
        const { mission_items } = mission_item;
        return (
          <Source
            key={mission_item.drone_id}
            type="geojson"
            data={convertToGeoJSON(JSON.parse(mission_items))}
          >
            <Layer
              type="line"
              paint={{
                "line-color": "#ff7e82",
                "line-width": 4,
                "line-dasharray": [2, 2],
                "line-opacity": 0.8,
              }}
              filter={["==", "$type", "LineString"]}
            />
            <Layer
              type="circle"
              paint={{
                "circle-radius": 3,
                "circle-color": "blue",
                "circle-opacity": 0.8,
                "circle-stroke-color": "blue",
                "circle-stroke-width": 2,
              }}
              filter={["==", "$type", "Point"]}
            />
          </Source>
        );
      });
    }
  }
  return (
    <Map
      initialViewState={{
        longitude: 8.545593799999999,
        latitude: 47.3977419,
        zoom: 20,
      }}
      mapStyle={"mapbox://styles/mapbox/light-v11"}
      mapboxAccessToken="pk.eyJ1Ijoic2FsdG11cmFpIiwiYSI6ImNsaTJ6cmE3bDJjbnEzY213ZTMwNWdkOGcifQ.c7JQWGP9Ak1a7t9OzQa89g"
    >
      {/* @ts-ignore */}
      {renderData()}
      {/* <Marker longitude={longitude} latitude={latitude}>
        <DroneMarker />
      </Marker> */}
      {renderGeoJSON()}
      <div className="absolute top-0 right-0">
        <div
          className="btn btn-sm opacity-50 rounded-xl"
          onClick={async () => {
            await resetDrones();
            restartWebSocket();
          }}
        >
          <TfiReload size={20} />
        </div>
      </div>
      <div className="absolute bottom-6 text-lg text-center text-black right-0 h-[250px] bg-gray-400 w-[330px] opacity-60 rounded-xl">
        {renderSelect()}
        {renderDroneInfo()}
      </div>
    </Map>
  );
};

export default DroneMap;
