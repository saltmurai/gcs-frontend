export function MissionCard(props: any) {
  return (
    <div className="w-full rounded-lg bg-white flex flex-col px-2 py-2">
      <span className="font-semibold">
        {props.Name}
        {"#"}
        {props.ID}
      </span>
      <div className="flex w-full">
        <span className="text-gray-500 flex-1">
          {`${props.DroneName} - ${props.PackageName} - ${props.SeqName}`}
        </span>
      </div>
      <span>Status: {props.Status ? "Confirmed" : "Unconfirmed"}</span>
    </div>
  );
}
