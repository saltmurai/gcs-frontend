import { Button, Group, Input, Modal, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CordinatePicker from "./CordinatePicker";

type point = 1 | 2 | 3 | 4;

export default function CordinatePickerModal({
  onWaypointChange,
  choosePoint,
  switchPoint,
}: {
  onWaypointChange: (e: any) => void;
  choosePoint: point;
  switchPoint: (point: point) => void;
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
          />
        </div>
      </Modal>
      <Group position="center">
        <button className="btn btn-primary btn-md" onClick={open}>
          Choose from map
        </button>
      </Group>
    </>
  );
}
