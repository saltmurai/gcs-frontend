import { useQuery } from "@tanstack/react-query";
import DroneCard, { DroneCardProps } from "./DroneCard";
import { getDrones } from "@/api/api";
import { HashLoader } from "react-spinners";
import AddDroneModal from "./AddDroneModal";

export default function DroneTab() {
  const { data, error, refetch, isLoading } = useQuery(["drone"], getDrones, {
    refetchInterval: 2000,
  });
  if (isLoading) {
    return <HashLoader color="red" />;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="h-full w-full">
      <AddDroneModal refetch={refetch} />
      <div className="flex border w-full shadow-inner bg-gray-100 rounded-lg py-2 flex-col gap-2 px-2 mt-2 overflow-scroll h-[25vh]">
        {data ? (
          data
            .sort((a: DroneCardProps, b: DroneCardProps) => {
              return a.Status === b.Status ? 0 : a.Status ? -1 : 1;
            })
            .map((drone: any) => {
              return <DroneCard key={drone.ID} {...drone} refetch={refetch} />;
            })
        ) : (
          <div>No drones in DB</div>
        )}
      </div>
    </div>
  );
}
