import { Background, ReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { useEffect, useState } from "react";
import SequenceViewer, { CustomNode } from "./CustomNode";

const nodeTypes = {
  custom: SequenceViewer,
};

export default function MissionVisualize({
  sequenceItems,
}: {
  sequenceItems: any[];
}) {
  const nodes = sequenceItems.map((seq, index) => {
    let label;
    let value;
    if (seq?.initSequence) {
      label = "Init";
      value = seq.initSequence;
    } else if (seq?.actionSequence) {
      label = "Action";
      value = seq.actionSequence;
    } else if (seq?.travelSequence) {
      label = "Travel";
      value = seq.travelSequence;
    }
    return {
      id: index.toString(),
      type: "custom",
      data: { label: label, value: value },
      position: { x: 400 * index, y: 0 },
    };
  });
  const edges = sequenceItems.map((seq, index) => {
    return {
      id: index.toString(),
      source: index.toString(),
      target: (index + 1).toString(),
    };
  });
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodesDraggable={true}
      nodeTypes={nodeTypes}
      draggable={true}
      maxZoom={0.7}
    >
      <Background />
    </ReactFlow>
  );
}
