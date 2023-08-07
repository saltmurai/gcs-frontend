import { useEffect, useState } from "react";
import {
  InitInstruction,
  SequenceItem,
  Controller,
  Termination,
} from "../../gen/mission/v1/mission_pb";
import Select, { MultiValue } from "react-select";
import { useMission } from "./MissionContext";
import HomePickerModal from "./HomePickerModal";
import MultiInput from "./MultiInput";
import { AiOutlineFileAdd } from "react-icons/ai";

const PeripheralOptions = [
  { value: 1, label: "Camera Forward" },
  { value: 2, label: "Camera Downward" },
  { value: 3, label: "LiDAR" },
  { value: 4, label: "Camera Odom" },
  { value: 5, label: "FCU" },
];

const ControllerOptions = [
  {
    value: Controller.PX4_VELO_FB,
    label: "PX4_VELO_FB",
  },
  {
    value: Controller.A_FB,
    label: "A_FB",
  },
  {
    value: Controller.A_ADRJ,
    label: "A_ADRJ",
  },
  {
    value: Controller.A_FW,
    label: "A_FW",
  },
];

const TerminationOptions = [
  {
    value: Termination.AUTO,
    label: "AUTO",
  },
  {
    value: Termination.STD,
    label: "STD",
  },
];
const defaultInitSeq = new InitInstruction({
  peripheral: [],
  controller: Controller.PX4_VELO_FB,
  terminate: Termination.AUTO,
});
export default function InitParam() {
  const [initInstruction, setInitInstruction] =
    useState<InitInstruction>(defaultInitSeq);
  const [home, setHome] = useState<any[]>([0, 0, 0]);
  const [isValidCordinate, setIsValidCordinate] = useState<boolean>(true);
  const { mission, dispatch } = useMission();
  const addToMission = () => {
    const initSeq = new SequenceItem({
      sequence: {
        case: "initSequence",
        value: initInstruction,
      },
    });
    dispatch({ type: "add", payload: initSeq.clone() });
  };

  // TODO: This is unsafe. Please refactor
  function changePeripheral(newValue: any) {
    if (newValue !== null) {
      initInstruction.peripheral = newValue.map((value: any) => value.value);
      setInitInstruction(initInstruction);
      return;
    }
    initInstruction.peripheral = [];
    setInitInstruction(initInstruction);
  }
  const changeController = (newValue: any) => {
    if (newValue === null) {
      initInstruction.controller = 0;
      setInitInstruction(initInstruction);
      return;
    }
    initInstruction.controller = newValue.value;
    setInitInstruction(initInstruction);
  };

  const changeTermination = (newValue: any) => {
    if (newValue === null) {
      initInstruction.terminate = 0;
      setInitInstruction(initInstruction);
      return;
    }
    initInstruction.terminate = newValue.value;
    setInitInstruction(initInstruction);
  };
  const changeHomeMap = (e: any) => {
    const { lng, lat } = e.lngLat;
    setHome([lng, lat, 0]);
    initInstruction.home = home;
    setInitInstruction(initInstruction);
  };
  const changeHomeManual = (e: any) => {
    const { name, value } = e.target;
    const [index, property] = name.split("-p");

    const isValidFloat = !isNaN(parseFloat(value));

    setHome((prev) => {
      const newHome = [...prev];
      newHome[parseInt(property) - 1] = value;
      return newHome;
    });
    if (isValidFloat) {
      setIsValidCordinate(true);
      initInstruction.home = home.map((value) => parseFloat(value));
      setInitInstruction(initInstruction);
    } else {
      setIsValidCordinate(false);
    }
  };

  return (
    <div className="flex flex-col">
      <label>Peripheral</label>
      <Select
        instanceId={"peripheral"}
        className="mt-2"
        options={PeripheralOptions}
        isMulti
        closeMenuOnSelect={false}
        onChange={changePeripheral}
      />
      <label>Home</label>
      <HomePickerModal
        init={initInstruction}
        onWaypointChange={changeHomeMap}
      />
      <MultiInput
        id="1"
        onChange={changeHomeManual}
        lng={home[0]}
        lat={home[1]}
      />

      <label>Controller</label>
      <Select
        instanceId={"controller"}
        options={ControllerOptions}
        isMulti={false}
        isClearable={true}
        defaultValue={ControllerOptions[0]}
        closeMenuOnSelect={false}
        onChange={changeController}
        className="mt-2"
      />
      <label>Terminate</label>
      <Select
        instanceId={"termination"}
        options={TerminationOptions}
        isMulti={false}
        isClearable={true}
        defaultValue={TerminationOptions[0]}
        closeMenuOnSelect={false}
        onChange={changeTermination}
        className="mt-2"
      />

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
