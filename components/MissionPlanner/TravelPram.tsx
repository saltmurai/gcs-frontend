import { useState } from "react";
import Select, { MultiValue } from "react-select";
import {
  TravelInstruction,
  SequenceItem,
  Planner,
  vector3,
} from "../../gen/mission/v1/mission_pb";
import MultiInput from "./MultiInput";
import { init } from "next/dist/compiled/@vercel/og/satori";
import { parse } from "path";
import { useMission } from "./MissionContext";
import CordinatePickerModal from "./CordinatePickerModal";

const plannerOptions = [
  {
    value: Planner.UNSPECIFIED,
    label: "UNSPECIFIED",
  },
  {
    value: Planner.EGO,
    label: "EGO",
  },
  {
    value: Planner.FAST,
    label: "FAST",
  },
  {
    value: Planner.MARKER,
    label: "MARKER",
  },
  {
    value: Planner.SAFELAND,
    label: "SAFELAND",
  },
];

type point = 1 | 2 | 3 | 4;
export default function TravelParam() {
  const [travelInstruction, setTravelInstruction] = useState<TravelInstruction>(
    new TravelInstruction()
  );
  const [waypoint, setWaypoint] = useState<vector3[]>([
    new vector3(),
    new vector3(),
    new vector3(),
  ]);
  const [constrains, setConstrains] = useState<vector3[]>([new vector3()]);
  const [choosePoint, setChoosePoint] = useState<point>(1);

  function hanldeClickMap(e: any) {
    const { lng, lat } = e.lngLat;
    console.log(lng, lat);
    // convert to 12 decimal places
    console.log(lng.toFixed(12));
    const lnglat = new vector3();

    lnglat.vector = [
      parseFloat(lng.toFixed(12)),
      parseFloat(lat.toFixed(12)),
      0,
    ];

    switch (choosePoint) {
      case 1:
        const waypointCopy = [...waypoint];
        waypointCopy[0].vector = lnglat.vector;
        setWaypoint(waypointCopy);
        console.log(waypointCopy);
        travelInstruction.waypoint = [...waypointCopy];
        setTravelInstruction(travelInstruction);
        break;
      case 2:
      case 3:
      case 4:
        break;
    }
  }

  function switchPoint(point: point) {
    setChoosePoint(point);
  }
  const { mission, dispatch } = useMission();
  const addToMission = () => {
    // const updatedTravelInstruction = new TravelInstruction();
    // updatedTravelInstruction.planner = travelInstruction.planner;
    // updatedTravelInstruction.waypoint = waypoint;
    // updatedTravelInstruction.constraint = constrains;
    // console.log(waypoint);
    console.log(travelInstruction);
    const newSequenceItem = new SequenceItem({
      sequence: {
        case: "travelSequence",
        value: travelInstruction,
      },
    });
    dispatch({ type: "add", payload: newSequenceItem.clone() });
  };

  function plannerOnChange(newValue: any) {
    const updatedTravelInstruction = new TravelInstruction();
    updatedTravelInstruction.planner = newValue.value;
    setTravelInstruction(updatedTravelInstruction);
  }
  function waypointOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (value === "") {
      return;
    }
    if (Number.isNaN(parseFloat(value))) {
      return;
    }

    const [index, property] = name.split("-p");
    const waypointIndex = parseInt(index) - 1;
    const propertyIndex = parseInt(property) - 1;

    if (isNaN(waypointIndex) || isNaN(propertyIndex)) {
      throw new Error("Invalid name");
    }

    const waypointCopy = [...waypoint];
    waypointCopy[waypointIndex].vector[propertyIndex] = parseFloat(value);

    setWaypoint(waypointCopy);
    travelInstruction.waypoint = [...waypointCopy];
    setTravelInstruction(travelInstruction);
  }

  function constrainsOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (value === "") {
      return;
    }
    if (Number.isNaN(parseFloat(value))) {
      return;
    }

    const [index, property] = name.split("-p");
    const constrainsIndex = parseInt(index) - 1;
    const propertyIndex = parseInt(property) - 1;

    if (isNaN(constrainsIndex) || isNaN(propertyIndex)) {
      throw new Error("Invalid name");
    }

    const constrainsCopy = [...constrains];
    constrainsCopy[constrainsIndex].vector[propertyIndex] = parseFloat(value);
    setConstrains(constrainsCopy);
    travelInstruction.constraint = [...constrainsCopy];
    setTravelInstruction(travelInstruction);
  }
  return (
    <div className="flex flex-col gap-2 overflow-auto">
      <label>Planner</label>
      <Select
        options={plannerOptions}
        isMulti={false}
        isSearchable={true}
        onChange={plannerOnChange}
      />
      <label>Waypoint</label>
      <div className="flex w-full gap-3 flex-col">
        <CordinatePickerModal
          onWaypointChange={hanldeClickMap}
          choosePoint={choosePoint}
          switchPoint={switchPoint}
        />
        <div className="flex w-full gap-3 justify-center">
          <MultiInput key={"1"} id="1" onChange={waypointOnChange} />
          <MultiInput key={"2"} id="2" onChange={waypointOnChange} />

          <MultiInput key={"3"} id="3" onChange={waypointOnChange} />
        </div>
      </div>
      <label>Constrains</label>
      <MultiInput key={"1"} id="1" onChange={constrainsOnChange} />
      <div className={`btn w-16 mt-12 ml-auto`} onClick={addToMission}>
        ADD
      </div>
    </div>
  );
}