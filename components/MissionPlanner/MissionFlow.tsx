import { Background, ReactFlow } from "reactflow";
import { useMission } from "./MissionContext";
import "reactflow/dist/style.css";
import MyCustomNode, { CustomNode } from "./InstructionNode";
import { useEffect, useState } from "react";

const nodeTypes = {
  custom: MyCustomNode,
};
export default function MissionFlow() {
  const { mission, dispatch } = useMission();
  const [nodes, setNodes] = useState<any[]>([]);
  const [edge, setEdge] = useState<any[]>([]);
  useEffect(() => {
    console.log("1");
    const newNodes = mission.sequenceItems.map((seq, index) => {
      return {
        id: index.toString(),
        type: "custom",
        data: { label: seq.sequence.case, value: seq },
        position: { x: 400 * index, y: 0 },
      };
    });
    setNodes(newNodes);
    const newEdge = mission.sequenceItems.map((seq, index) => {
      return {
        id: index.toString(),
        source: index.toString(),
        target: (index + 1).toString(),
      };
    });
    setEdge(newEdge);
  }, [mission]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edge}
      nodesDraggable={true}
      nodeTypes={nodeTypes}
      draggable={true}
      maxZoom={0.7}
    >
      <Background />
    </ReactFlow>
  );
}
