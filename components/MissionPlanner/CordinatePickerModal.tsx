import { Button, Group, Input, Modal, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CordinatePicker from "./CordinatePicker";
import { vector3 } from "@/gen/mission/v1/mission_pb";
import { TbMapSearch } from "react-icons/tb";

type point = 1 | 2 | 3 | 4;

export default function CordinatePickerModal({
  onWaypointChange,
  choosePoint,
  switchPoint,
  waypoint,
}: {
  onWaypointChange: (e: any) => void;
  choosePoint: point;
  switchPoint: (point: point) => void;
  waypoint: vector3[];
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size={"80vw"}
        title="Choose from map"
        opened={opened}
        onClose={close}
      >
        <div className="w-full pb-2 h-96">
          <CordinatePicker
            choosePoint={choosePoint}
            switchPoint={switchPoint}
            onWaypointChange={onWaypointChange}
            waypoint={waypoint}
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="btn btn-primary" onClick={close}>
            Confirm
          </div>
        </div>
      </Modal>
      <Group position="left">
        <button
          className="btn btn-primary btn-sm btn-outline flex gap-2"
          onClick={open}
        >
          <TbMapSearch size={20} /> Choose from map
        </button>
      </Group>
    </>
  );
}
