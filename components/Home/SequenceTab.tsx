import { getSequences } from "@/api/api";
import SendMission from "./AddMissionModal";
import { useQuery } from "@tanstack/react-query";
import { MissionCard } from "./MissionCard";
import { SequenceCard } from "./SequenceCard";

export default function SequenceTab() {
  const { data, isLoading, isError, refetch } = useQuery(
    ["getSequences"],
    getSequences
  );
  console.log(data);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const rendersMission = () => {
    if (!data) {
      return <div>No data</div>;
    }
    return data.map((mission: any) => {
      return (
        <SequenceCard
          key={mission.ID}
          props={{ ...mission }}
          refetch={refetch}
        />
      );
    });
  };

  return (
    <>
      <div className="flex border h-[25vh] overflow-scroll shadow-inner bg-gray-100 rounded-lg py-2 flex-col gap-2 px-2 mt-2 w-full">
        {rendersMission()}
      </div>
    </>
  );
}
