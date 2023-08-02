import Select, { MultiValue } from "react-select";
import {
  ActionInstruction,
  InitInstruction,
  TravelInstruction,
  SequenceItem,
  Controller,
  Termination,
  SendMissionRequest,
  Action,
} from "../../gen/mission/v1/mission_pb";
import { useState } from "react";
import { useImmer } from "use-immer";
import { useMission } from "./MissionContext";
import { AiOutlineFileAdd } from "react-icons/ai";

const actionOptions = [
  {
    value: Action.UNSPECIFIED,
    label: "UNSPECIFIED",
  },
  {
    value: Action.AUTOLAND,
    label: "AUTOLAND",
  },
  {
    value: Action.DISARM,
    label: "DISARM",
  },
  {
    value: Action.HOLD,
    label: "HOLD",
  },
  {
    value: Action.RELEASE,
    label: "RELEASE",
  },
  {
    value: Action.RTLHOME,
    label: "RTLHOME",
  },
  {
    value: Action.SELFCHECK,
    label: "SELFCHECK",
  },
  {
    value: Action.TAKEOFF,
    label: "TAKEOFF",
  },
];

const PackageOptions = [
  {
    value: 1,
    label: "Package 1",
  },
  {
    value: 2,
    label: "Package 2",
  },
  {
    value: 3,
    label: "Package 3",
  },
];

const InitParams = "0.000000000000";
export default function ActionParam() {
  const [params, setParams] = useState<any>(InitParams);
  const [actionInstruct, setActionInstruct] = useState<ActionInstruction>(
    new ActionInstruction()
  );

  const { mission, dispatch } = useMission();
  const actionSeq = new SequenceItem({
    sequence: {
      case: "actionSequence",
      value: actionInstruct,
    },
  });
  const addToMission = () => {
    dispatch({ type: "add", payload: actionSeq.clone() });
  };
  function isFloat(n: string) {
    const num = parseFloat(n);
    return !isNaN(num);
  }
  function OnInputParam(event: React.ChangeEvent<HTMLInputElement>) {
    // with 12 decimal places
    const value = parseFloat(event.target.value).toFixed(12);
    setParams(value.toString());
    if (isFloat(value)) {
      actionInstruct.param = parseFloat(value);
      setActionInstruct(actionInstruct);
    }
  }
  function onActionChange(newValue: any) {
    actionInstruct.action = newValue.value;
    setActionInstruct(actionInstruct);
  }
  function onPackageChange(newValue: any) {
    if (newValue == null) {
      actionInstruct.package = [];
      setActionInstruct(actionInstruct);
      return;
    }
    actionInstruct.package = newValue.map((v: any) => v.value);
    setActionInstruct(actionInstruct);
  }

  return (
    <div className="flex flex-col gap-2">
      <label>Action Type</label>
      <Select
        instanceId={"action"}
        options={actionOptions}
        isMulti={false}
        isSearchable={true}
        onChange={onActionChange}
      />
      <label>Package</label>
      <Select
        options={PackageOptions}
        isMulti={true}
        isSearchable={true}
        onChange={onPackageChange}
      />
      <label>Param</label>
      <input
        type="text"
        // value={params.toString()}
        placeholder="0.000000000000"
        className={`input input-bordered input-primary w-full max-w-xs ${
          !isFloat(params) && "text-red-500"
        }`}
        onChange={OnInputParam}
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
