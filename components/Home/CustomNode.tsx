import { SequenceItem } from "@/gen/mission/v1/mission_pb";
import { Handle, Node, NodeProps, Position } from "reactflow";
import { Code } from "@mantine/core";

type NodeData = {
  label: string;
  value?: any;
};

export type CustomNode = Node<NodeData>;

export default function SequenceViewer({ data }: NodeProps<NodeData>) {
  return (
    <div className="w-76 h-96 rounded-md border-2 border-blue-200 shadow-md py-0 nodrag cursor-default">
      <div className="w-full bg-blue-400 font-semibold text-white text-xl h-8 flex items-center justify-center">
        <span>{data.label.split("Sequence")[0].toUpperCase()}</span>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
        style={{
          right: "calc(100% - 5px)",
        }}
      />

      <div className="max-h-[90%] overflow-scroll text-xs">
        <Code block>{JSON.stringify(data.value, null, 2)}</Code>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={true}
        style={{
          left: "calc(100% - 5px)",
        }}
      />
    </div>
  );
}
