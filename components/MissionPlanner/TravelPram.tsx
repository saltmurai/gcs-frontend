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
import { AiOutlineFileAdd } from "react-icons/ai";

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
        const waypointCopy2 = [...waypoint];
        waypointCopy2[1].vector = lnglat.vector;
        setWaypoint(waypointCopy2);
        console.log(waypointCopy2);
        travelInstruction.waypoint = [...waypointCopy2];
        setTravelInstruction(travelInstruction);
        break;
      case 3:
        const waypointCopy3 = [...waypoint];
        waypointCopy3[2].vector = lnglat.vector;
        setWaypoint(waypointCopy3);
        console.log(waypointCopy3);
        travelInstruction.waypoint = [...waypointCopy3];
        setTravelInstruction(travelInstruction);
        break;
      case 4:
        break;
    }
  }

  function switchPoint(point: point) {
    setChoosePoint(point);
  }
  const { mission, dispatch } = useMission();
  const addToMission = () => {
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
          waypoint={waypoint}
          switchPoint={switchPoint}
        />
        <div className="flex w-full gap-3 justify-center">
          <MultiInput
            key={"1"}
            id="1"
            onChange={waypointOnChange}
            lng={waypoint[0].vector[0]}
            lat={waypoint[0].vector[1]}
          />
          <MultiInput
            key={"2"}
            id="2"
            onChange={waypointOnChange}
            lng={waypoint[1].vector[0]}
            lat={waypoint[1].vector[1]}
          />

          <MultiInput
            key={"3"}
            id="3"
            onChange={waypointOnChange}
            lng={waypoint[2].vector[0]}
            lat={waypoint[2].vector[1]}
          />
        </div>
      </div>
      <label>Constrains</label>
      <MultiInput key={"1"} id="1" onChange={constrainsOnChange} />
      <div
        className={`btn mt-12 ml-auto btn-sm flex gap-2 no-animation bg-blue-500`}
        onClick={addToMission}
      >
        <AiOutlineFileAdd size={20} />
        ADD
      </div>
    </div>
  );
}
