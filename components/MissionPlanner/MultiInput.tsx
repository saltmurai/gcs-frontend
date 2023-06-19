import { vector3 } from "@/gen/mission/v1/mission_pb";
import { useState } from "react";

export default function MultiInput({
  id,
  onChange,
  isManual = false,
  lng,
  lat,
}: {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isManual?: boolean;
  lng?: number;
  lat?: number;
}) {
  return (
    <div>
      <div className="form-control w-full">
        <label className=" input-group input-group-sm flex flex-col w-32 gap-2">
          <span className="">{`Point ${id}`}</span>
          <input
            type="text"
						placeholder="longitude"
						value={lng}
            className="input input-bordered input-sm"
            name={`${id}-p1`}
          />
          <input
            type="text"
						value={lat}
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
