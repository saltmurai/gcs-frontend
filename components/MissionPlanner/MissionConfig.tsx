import { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm";
import {
  ActionInstruction,
  InitInstruction,
  TravelInstruction,
  SequenceItem,
  Controller,
  Termination,
  SendMissionRequest,
} from "../../gen/mission/v1/mission_pb";
import client from "@/gRPC/client";
import clsx from "clsx";
import UIConfig from "./UIConfig";
import { useMission } from "./MissionContext";

type ActionType = "Init" | "Travel" | "Action";

type Tab = "Config" | "JSON config";

export default function MissionConfig() {
  const [actionType, setActionType] = useState<ActionType>("Init");
  const [activeTab, setActiveTab] = useState<Tab>("Config");
  const { mission, dispatch } = useMission();
  const sendMission = async () => {
    try {
      // Push the instruction to the sequence list
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex-1 bg-white rounded-md flex flex-col p-3 max-w-md">
      <div className="tabs">
        <div
          className={clsx(
            activeTab === "Config" && "tab-active",
            "tab tab-bordered"
          )}
          onClick={() => setActiveTab("Config")}
        >
          Config
        </div>
        <div
          className={clsx(
            activeTab === "JSON config" && "tab-active",
            "tab tab-bordered"
          )}
          onClick={() => setActiveTab("JSON config")}
        >
          JSON config
        </div>
      </div>
      <div className="flex-1">
        {activeTab === "Config" && <UIConfig />}
        {activeTab === "JSON config" && (
          <JSONInput
            //@ts-ignore
            locale={locale}
            key={"json"}
            placeholder={mission.toJson()}
            height="100%"
            width="100%"
          />
        )}
      </div>
    </div>
  );
}
