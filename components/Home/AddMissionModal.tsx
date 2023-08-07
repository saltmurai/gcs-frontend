import {
  AddMissionProp,
  addMission,
  getDrones,
  getPackages,
  getSequences,
} from "@/api/api";
import { SendMissionRequest } from "@/gen/mission/v1/mission_pb";
import { Button, Input, Modal, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AiFillPlusCircle } from "react-icons/ai";

export default function SendMission({ refetch }: { refetch: () => void }) {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const {
    data: droneData,
    isError: isDroneError,
    isLoading: isDroneLoading,
  } = useQuery(["drones-mission"], getDrones);
  const { data: packageData } = useQuery(["packages"], getPackages);
  const { data: sequenceData } = useQuery(["sequences"], getSequences);
  const form = useForm({
    initialValues: {
      name: "",
      droneID: "",
      packageID: "",
      sequenceID: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
    },
  });
  async function onSubmit(values: any) {
    const params: AddMissionProp = {
      name: values.name,
      droneID: Number(values.droneID),
      packageID: Number(values.packageID),
      seqID: Number(values.sequenceID),
      path: {},
    };
    const { status } = await addMission(params);
    if (status === 201) {
      close();
      form.reset();
      refetch();
      notifications.show({
        title: "Success",
        message: "Mission added",
        color: "green",
      });
    }
  }
  if (isDroneLoading) return <div>Loading...</div>;
  if (isDroneError) return <div>Error...</div>;
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add mission">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Input.Wrapper id="input-demo" withAsterisk label="Name">
            <Input
              id="input-demo"
              placeholder="Mission Name"
              {...form.getInputProps("name")}
            />
          </Input.Wrapper>
          {droneData ? (
            <Select
              data={droneData.map((d: any) => {
                return { value: d.ID, label: `${d.Name}#${d.ID}` };
              })}
              label="Drone"
              withAsterisk
              {...form.getInputProps("droneID")}
            />
          ) : (
            <div>- No Drone in DB</div>
          )}
          {packageData ? (
            <Select
              data={packageData.map((d: any) => {
                return { value: d.ID, label: `${d.Name}#${d.ID}` };
              })}
              label="Packages"
              withAsterisk
              {...form.getInputProps("packageID")}
            />
          ) : (
            <div>- No Packages in DB</div>
          )}
          {sequenceData ? (
            <Select
              data={sequenceData.map((d: any) => {
                return { value: d.ID, label: `${d.Name}#${d.ID}` };
              })}
              withAsterisk
              label="Sequences"
              {...form.getInputProps("sequenceID")}
            />
          ) : (
            <div>- No Sequences in DB</div>
          )}
          <Button type="submit" className="btn btn-primary btn-md mt-5 ml-auto">
            Confirm
          </Button>
        </form>
      </Modal>
      <div className="flex justify-end w-full pt-2">
        <AiFillPlusCircle onClick={open} className="w-8 h-8" />
      </div>
    </>
  );
}
