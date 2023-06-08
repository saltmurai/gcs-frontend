import { vector3 } from "@/gen/mission/v1/mission_pb";
import { useState } from "react";

export default function MultiInput({
  id,
  onChange,
}: {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div className="form-control">
        <label className=" input-group input-group-sm flex flex-col w-24 gap-2">
          <span className="">{`Point ${id}`}</span>
          <input
            type="text"
            disabled={true}
            placeholder="longitude"
            className="input input-bordered input-sm input-disabled"
            name={`${id}-p1`}
          />
          <input
            type="text"
            disabled={true}
            placeholder="latitude"
            className="input input-bordered input-sm"
            name={`${id}-p2`}
          />
          <input
            type="text"
            placeholder="height"
            className="input input-bordered input-sm"
            name={`${id}-p3`}
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  );
}
