import { getMission } from "@/api/api";
import SendMission from "./AddMissionModal";
import { useQuery } from "@tanstack/react-query";
import { MissionCard } from "./MissionCard";

export default function MissionTab() {
  const { data, isLoading, isError } = useQuery(["missions"], getMission);
  console.log(data);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <>
      <SendMission />
      <div className="flex border shadow-inner bg-gray-100 rounded-lg py-2 flex-col gap-2 px-2 mt-2 overflow-scroll">
        {data.map((mission: any) => {
          return <MissionCard key={mission.ID} {...mission} />;
        })}
      </div>
    </>
  );
}
