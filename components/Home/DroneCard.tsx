import { deleteDrone } from "@/api/api";
import { useQueryClient } from "@tanstack/react-query";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

export type DroneCardProps = {
  ID: string;
  Name: string;
  Address: string;
  Ip: string;
  Status: boolean;
};

export default function DroneCard(props: DroneCardProps) {
  const queryClient = useQueryClient();
  return (
    <div className="bg-white rounded-lg px-3 py-1 h-auto flex flex-col">
      <div className="flex w-full items-center gap-2">
        <div className="font-bold">{props.Name}</div>
        <div
          className={`rounded-full w-3 h-3 ${
            props.Status ? "bg-green-400" : "bg-red-400"
          }`}
        ></div>
      </div>
      <div className="flex">
        <div className="text-gray-500 flex-1">
          <span className="text-gray-800">System address:</span> {props.Address}{" "}
          <br />
          <span>IP:</span> {props.Ip}
        </div>
        <AiOutlineDelete
          className="text-gray-300 hover:text-red-500"
          size={22}
          onClick={async () => {
            try {
              const res = await deleteDrone(props.ID);
              if (res.status === 500) {
                throw new Error(
                  "Cannot delete drone. There is a mission in progress. Please delete mission first if you want to delete this drone"
                );
              }
            } catch (error) {
              alert(error);
            }
          }}
        />
      </div>
    </div>
  );
}
