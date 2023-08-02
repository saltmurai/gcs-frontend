import { Button, Group, Input, Modal, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
import { TbMapSearch } from "react-icons/tb";
import { InitInstruction } from "@/gen/mission/v1/mission_pb";

type Point = {
  lat: number;
  lng: number;
};
const initCordinates: Point = {
  lat: 21.005859155053443,
  lng: 105.84212921674695,
};

function SinglePicker({
  onWaypointChange,
  init,
}: {
  onWaypointChange: (e: any) => void;
  init: InitInstruction;
}) {
  const [singlePoint, setSinglePoint] = useState<Point | undefined>({
    lat: init.home[1] || 0,
    lng: init.home[0] || 0,
  });
  const [currentPos, setCurrentPos] = useState<Point | undefined>(
    initCordinates
  );

  function hanldelClickMap(e: any) {
    const lnglat = e.lngLat;
    setSinglePoint({ lat: lnglat.lat, lng: lnglat.lng });
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
        hanldelClickMap(e);
      }}
      onMouseMove={(e: any) => {
        setCurrentPos({ lat: e.lngLat.lat, lng: e.lngLat.lng });
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=3fzb5U4yydF2pqQIBClw "
    >
      {/* <Marker longitude={lnglat[0]} latitude={lnglat[1]}></Marker> */}
      {singlePoint && (
        <Marker longitude={singlePoint.lng} latitude={singlePoint.lat}>
          <AiFillHome
            size={30}
            className="text-green-500 shadow-lg hover:text-green-600 transition-all"
          />
        </Marker>
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
            Home: {singlePoint?.lat}, {singlePoint?.lng}
          </div>
        </div>
      </div>
    </Map>
  );
}

export default function HomePickerModal({
  onWaypointChange,
  init,
}: {
  onWaypointChange: (e: any) => void;
  init: InitInstruction;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size={"80vw"}
        title="Choose from map"
        opened={opened}
        onClose={close}
      >
        <div className="w-full pb-2 h-96">
          <SinglePicker onWaypointChange={onWaypointChange} init={init} />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="btn btn-primary" onClick={close}>
            Confirm
          </div>
        </div>
      </Modal>
      <Group position="left" className="mb-2">
        <button
          className="btn btn-primary btn-sm btn-outline flex gap-2"
          onClick={open}
        >
          <TbMapSearch size={20} /> Choose from map
        </button>
      </Group>
    </>
  );
}
