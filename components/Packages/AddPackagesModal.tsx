import {
  Button,
  Group,
  Input,
  Modal,
  NativeSelect,
  NumberInput,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { AddPackageProp, addPackage, getUsers } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

export default function AddPackages() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useQuery(["users"], getUsers);
  const form = useForm({
    initialValues: {
      name: "",
      weight: 0,
      width: 0,
      height: 0,
      length: 0,
      senderID: "",
      receiverID: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      weight: (value) => (value > 0 ? null : "Weight is required"),
      width: (value) => (value > 0 ? null : "Width is required"),
      height: (value) => (value > 0 ? null : "Height is required"),
      length: (value) => (value > 0 ? null : "Length is required"),
      senderID: (value) =>
        value.trim().length > 0 ? null : "Sender is required",
      receiverID: (value) =>
        value.trim().length > 0 ? null : "Receiver is required",
    },
  });
  async function onSubmit(values: AddPackageProp) {
    const res = await addPackage(values);
    if (res.status === 201) {
      close();
      form.reset();
      notifications.show({
        title: "Success",
        message: "Package added",
        color: "green",
      });
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add a Packages">
        <div>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Input.Wrapper id="input-demo" withAsterisk label="Name">
              <Input
                id="input-demo"
                placeholder="Packages Name"
                {...form.getInputProps("name")}
              />
            </Input.Wrapper>
            <NumberInput
              label="Weight"
              icon="kg"
              defaultValue={0.05}
              withAsterisk
              precision={2}
              min={0}
              step={0.05}
              {...form.getInputProps("weight")}
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
              {...form.getInputProps("width")}
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
              {...form.getInputProps("height")}
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
              {...form.getInputProps("length")}
            />

            {data ? (
              <>
                <Select
                  label="Sender"
                  placeholder="Select a sender"
                  data={data.map((user: any) => {
                    return { value: user.ID, label: user.Name };
                  })}
                  {...form.getInputProps("senderID")}
                />
                <Select
                  label="Receiver"
                  placeholder="Select a Receiver"
                  data={data.map((user: any) => {
                    return { value: user.ID, label: user.Name };
                  })}
                  {...form.getInputProps("receiverID")}
                />
              </>
            ) : (
              <div>No user in DB</div>
            )}
            {/* <Select
              label="Receiver"
              placeholder="Select a Receiver"
              data={data.map((user: any) => {
                return { value: user.ID, label: user.Name };
              })}
              {...form.getInputProps("receiverID")}
            /> */}

            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="btn btn-secondary mt-5 rounded-xl"
              >
                Submit
              </Button>
            </div>
          </form>
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
