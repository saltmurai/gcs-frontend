import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { GiDeliveryDrone } from "react-icons/gi";
import Home from "./Home/Home";
import Mission from "./Mission";
import { HashLoader } from "react-spinners";
import Packages from "./Packages/Packages";

// A layout that has a topbar
const TabList = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Mission Planner",
    href: "/mission",
  },
  {
    name: "Packages",
    href: "/packages",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export default function Container() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Mission Planner");
  return (
    <>
      <div className="min-h-screen min-w-screen p-2 bg-slate-200 flex gap-2 flex-col">
        {/* Topbar */}
        <div className="flex bg-white h-12 items-center p-2 rounded-md">
          <GiDeliveryDrone color="black" size={32} />
          <div className="tabs flex-1 ml-5	">
            {TabList.map((tab) => {
              return (
                <div
                  key={tab.name}
                  className={clsx(
                    tab.name === activeTab && "tab-active",
                    "tab tab-bordered"
                  )}
                  onClick={() => {
                    setActiveTab(tab.name);
                  }}
                >
                  {tab.name}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <div>Admin</div>
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img src="/avatar.png" />
              </div>
            </div>
          </div>
        </div>
        <>
          {activeTab === "Home" && <Home />}
          {activeTab === "Mission Planner" && <Mission />}
          {activeTab === "Packages" && <Packages />}
        </>
      </div>
    </>
  );
}
