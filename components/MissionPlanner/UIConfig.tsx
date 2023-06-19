import { useState } from "react";
import InitParam from "./InitParam";
import { useMission } from "./MissionContext";
import TravelParam from "./TravelPram";
import ActionParam from "./ActionParam";
import client from "@/gRPC/client";
import { Button } from "@mantine/core";
import CreateSequenceModal from "./AddSequenceModal";

const actionList = ["Init", "Travel", "Action"];
const userAction = ["Create a new mission", "Edit a mission"];
type ActionType = (typeof actionList)[number];
export default function UIConfig() {
  const [actionType, setActionType] = useState<ActionType>("Init");
  const [userAction, setUserAction] = useState<string>("");
  const { mission, dispatch } = useMission();
  function changeActionType(event: React.ChangeEvent<HTMLSelectElement>) {
    setActionType(event.target.value as ActionType);
  }
  async function sendMission() {
    const response = await client.sendMission(mission);
    console.log(response);
  }
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex-1">
          <select
            className="select w-full max-w-xs select-primary mt-5"
            onChange={changeActionType}
            value={actionType}
          >
            {actionList.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
          {actionType === "Init" && <InitParam />}
          {actionType === "Travel" && <TravelParam />}
          {actionType === "Action" && <ActionParam />}
        </div>
        <div className="flex justify-around">
          <CreateSequenceModal mission={mission} />
          <div
            className="btn w-1/3 self-center bg-red-300"
            onClick={() => dispatch({ type: "remove" })}
          >
            Clear Sequence
          </div>
        </div>
      </div>
    </>
  );
}
