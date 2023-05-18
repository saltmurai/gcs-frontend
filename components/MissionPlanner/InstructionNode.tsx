import { SequenceItem } from "@/gen/mission/v1/mission_pb";
import { Handle, Node, NodeProps, Position } from "reactflow";

type NodeData = {
  label: string;
  value?: SequenceItem;
};

export type CustomNode = Node<NodeData>;

export default function MyCustomNode({ data }: NodeProps<NodeData>) {
  return (
    <div className="w-76 h-96 rounded-md border-2 border-blue-200 shadow-md py-0 nodrag">
      <div className="w-full bg-pink-300 font-semibold text-white text-3xl flex items-center justify-center">
        <span>{data.label.split("Sequence")[0].toUpperCase()}</span>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
        style={{
          width: "10px",
          height: "10px",
          right: "calc(100% - 5px)",
          backgroundColor: "red",
        }}
      />

      <div className="h-full overflow-hidden text-xs">
        <pre>
          {JSON.stringify(data.value?.sequence.value?.toJson(), null, 2)}
        </pre>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={true}
        style={{
          width: "10px",
          height: "10px",
          left: "calc(100% - 5px)",
          backgroundColor: "red",
        }}
      />
    </div>
  );
}
