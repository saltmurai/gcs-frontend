import { getDrones } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import DroneCard from "./DroneCard";
import { HashLoader } from "react-spinners";
import clsx from "clsx";
import { useState } from "react";
import DroneTab from "./DroneTab";
import Mission from "../Mission";
import SendMission from "./AddMissionModal";
import MissionTab from "./MissionTab";
import { Divider } from "@mantine/core";
import LogWindow from "./LogWindow";

type Tabs = "Drone" | "Mission" | "Sequence";

export default function LeftBar() {
  const [activeTab, setActiveTabs] = useState<Tabs>("Drone");

  return (
    <div className="px-2 flex items-center flex-col">
      <div className="flex w-full">
        <div className="tabs flex-1 flex justify-around">
          <div
            className={clsx(
              activeTab === "Drone" && "tab-active",
              "tab tab-bordered w-1/3"
            )}
            onClick={() => setActiveTabs("Drone")}
          >
            Drone
          </div>
          <div
            className={clsx(
              activeTab === "Mission" && "tab-active",
              "tab tab-bordered w-1/3"
            )}
            onClick={() => setActiveTabs("Mission")}
          >
            Mission
          </div>
          <div
            className={clsx(
              activeTab === "Sequence" && "tab-active",
              "tab tab-bordered w-1/3"
            )}
            onClick={() => setActiveTabs("Sequence")}
          >
            Sequence
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-1/2 w-full">
        {activeTab === "Drone" && <DroneTab />}
        {activeTab === "Mission" && <MissionTab />}
      </div>
      <div className="divider">Log</div>
      <div className="flex-1 w-full overflow-scroll">
        <LogWindow />
      </div>
    </div>
  );
}
