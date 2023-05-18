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
            placeholder="Point 1"
            className="input input-bordered input-sm"
            name={`${id}-p1`}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Point 2"
            className="input input-bordered input-sm"
            name={`${id}-p2`}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Point 3"
            className="input input-bordered input-sm"
            name={`${id}-p3`}
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  );
}
