import MissionConfig from "./MissionPlanner/MissionConfig";
import MissionProvider from "./MissionPlanner/MissionContext";
import MissionFlow from "./MissionPlanner/MissionFlow";

export default function Mission() {
  return (
    <div className="flex bg-slate-200 flex-1 gap-2">
      <MissionProvider>
        <MissionConfig />
        <div className="flex-1 bg-white rounded-md">
          <MissionFlow />
        </div>
      </MissionProvider>
    </div>
  );
}
