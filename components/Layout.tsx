import clsx from "clsx";
import { useRouter } from "next/router";

import { GiDeliveryDrone } from "react-icons/gi";

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
    name: "Settings",
    href: "/settings",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen min-w-screen p-2 bg-slate-200 flex gap-2 flex-col">
        <div className="flex bg-white h-12 items-center p-2 rounded-md">
          <GiDeliveryDrone color="black" size={32} />
          <div className="tabs flex-1 ml-5	">
            {TabList.map((tab) => {
              return (
                <a
                  key={tab.name}
                  className={clsx(
                    tab.href === router.asPath && "tab-active",
                    "tab tab-bordered"
                  )}
                  href={tab.href}
                >
                  {tab.name}
                </a>
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
        {children}
      </div>
    </>
  );
}
