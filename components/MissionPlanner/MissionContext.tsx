import {
  ActionInstruction,
  InitInstruction,
  SendMissionRequest,
  SequenceItem,
  TravelInstruction,
} from "@/gen/mission/v1/mission_pb";
import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
// import { useImmerReducer } from "use-immer";
// import { produce, Draft } from "immer";

const MissionContext = createContext<SendMissionRequest>(
  new SendMissionRequest()
);

const MisisonUpdateContext = createContext<React.Dispatch<any>>(() => {});

export default function MissionProvider({ children }: { children: ReactNode }) {
  const [mission, dispatch] = useReducer(
    missionReducer,
    new SendMissionRequest()
  );
  return (
    <MissionContext.Provider value={mission}>
      <MisisonUpdateContext.Provider value={dispatch}>
        {children}
      </MisisonUpdateContext.Provider>
    </MissionContext.Provider>
  );
}

export type MissionDispatchAction = {
  type: "add" | "remove" | "update" | "clear";
  payload: SequenceItem;
};

//rewrote above funtion to not use immer
function missionReducer(
  state: SendMissionRequest,
  action: MissionDispatchAction
) {
  switch (action.type) {
    case "add": {
      const clone = state.clone();
      const newSequenceItems = [...state.sequenceItems, action.payload];
      clone.sequenceItems = newSequenceItems;
      return clone;
    }
    case "remove": {
      const clone = state.clone();
      const emptySequenceItems = new Array<SequenceItem>();
      clone.sequenceItems = emptySequenceItems;
      return clone;
    }
    default:
      throw new Error("Invalid action type");
  }
}

export function useMission() {
  const mission = useContext(MissionContext);
  const dispatch = useContext(MisisonUpdateContext);
  return { mission, dispatch };
}
