import { AddDroneProp, addDrone, api } from "@/api/api";
import { Button, Input, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Subtitle } from "@tremor/react";
import { AiFillPlusCircle } from "react-icons/ai";

export default function AddDroneModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      address: "",
      ip: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      address: (value) => {
        const regex = /^(serial:\/\/\/.*|udp:\/\/(.*:\d+)?|tcp:\/\/(.*:\d+)?)/;
        return regex.test(value) ? null : "Address is invalid";
      },
      ip: (value) => {
        const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        return regex.test(value) ? null : "IP is invalid";
      },
    },
  });

  async function onSubmit(values: AddDroneProp) {
    const res = await addDrone(values);
    if (res.status === 201) {
      close();
      form.reset();
      alert("Drone added successfully");
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add a Packages">
        <div>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Input.Wrapper id="input-demo" withAsterisk label="Drone Name">
              <Input
                id="input-demo"
                placeholder="Drone name"
                {...form.getInputProps("name")}
              />
            </Input.Wrapper>
            <Input.Wrapper
              id="input-demo"
              withAsterisk
              label="Drone System address"
              className="mt-5"
            >
              <p className="text-gray-500 text-sm">
                Serial: serial:///path/to/serial/dev[:baudrate]
                <br />
                UDP: udp://[bind_host][:bind_port]
                <br />
                TCP: tcp://[server_host][:server_port]
              </p>
              <Input
                className="mt-2"
                id="input-demo"
                placeholder="Drone system address"
                {...form.getInputProps("address")}
              />
            </Input.Wrapper>
            <Input.Wrapper
              id="input-demo"
              withAsterisk
              label="Drone IP"
              className="mt-5"
            >
              <Input
                className="mt-2"
                id="input-demo"
                placeholder="Drone IP"
                {...form.getInputProps("ip")}
              />
            </Input.Wrapper>
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

      <div className="flex justify-end w-full pt-2">
        <AiFillPlusCircle onClick={open} className="w-8 h-8" />
      </div>
    </>
  );
}
