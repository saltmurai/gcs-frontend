import { deleteSequence } from "@/api/api";
import { Menu, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import MissionVisualize from "./ViewMission";

export function SequenceCard({
  props,
  refetch,
}: {
  props: any;
  refetch: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const handleDeleteSequence = async () => {
    await deleteSequence(props.ID);
    refetch();
  };
  return (
    <>
      <div className="w-full rounded-lg bg-white flex flex-col px-2 py-2">
        <div className="w-full flex">
          <span className="font-semibold flex-1">
            {props.Name}
            {"#"}
            {props.ID}
          </span>
          <Menu shadow="lg" position="left">
            <Menu.Target>
              <Tooltip label="Menu" position="left">
                <button>
                  <HiDotsVertical size={18} />
                </button>
              </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Mission menu</Menu.Label>
              <Menu.Item onClick={open} icon={<AiOutlineEye size={14} />}>
                View Sequence
              </Menu.Item>
              <Menu.Item
                icon={<AiOutlineDelete size={14} />}
                onClick={handleDeleteSequence}
              >
                Delete Sequence
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
      <Modal
        title="View Sequence"
        opened={opened}
        onClose={close}
        size={"80vw"}
      >
        <div className="h-[70vh]">
          <MissionVisualize sequenceItems={props.Seq.sequenceItems} />
        </div>
        <div className="flex items-center justify-center">
          <div className="btn btn-primary mx-auto" onClick={close}>
            Close
          </div>
        </div>
      </Modal>
    </>
  );
}
