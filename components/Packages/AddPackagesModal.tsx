import { Button, Group, Input, Modal, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function AddPackages() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add a Packages">
        <div>
          <Input.Wrapper id="input-demo" withAsterisk label="Name">
            <Input id="input-demo" placeholder="Packages Name" />
          </Input.Wrapper>
          <NumberInput
            label="Weight"
            icon="kg"
            defaultValue={0.05}
            withAsterisk
            precision={2}
            min={0}
            step={0.05}
            max={1}
          />
          <NumberInput
            label="Width"
            icon="m"
            defaultValue={0.05}
            withAsterisk
            precision={2}
            min={0}
            step={0.05}
            max={1}
          />
          <NumberInput
            label="Height"
            icon="m"
            defaultValue={0.05}
            withAsterisk
            precision={2}
            min={0}
            step={0.05}
            max={1}
          />
          <NumberInput
            label="Length"
            icon="m"
            defaultValue={0.05}
            withAsterisk
            precision={2}
            min={0}
            step={0.05}
            max={1}
          />
          <Input.Wrapper id="input-demo" withAsterisk label="Sender Name">
            <Input id="input-demo" placeholder="Sender name/ID" />
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" withAsterisk label="Sender Name">
            <Input id="input-demo" placeholder="Receiver name/ID" />
          </Input.Wrapper>
        </div>
        <div className="w-full flex justify-end">
          <div className="btn btn-secondary mt-5 rounded-xl">Submit</div>
        </div>
      </Modal>

      <Group position="center">
        <div className="btn btn-primary rounded-xl" onClick={open}>
          Add Package
        </div>
      </Group>
    </>
  );
}
