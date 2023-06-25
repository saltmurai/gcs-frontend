import { addSequence } from "@/api/api";
import { SendMissionRequest } from "@/gen/mission/v1/mission_pb";
import { Button, Input, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AiFillPlusCircle } from "react-icons/ai";

export default function CreateSequenceModal({
  mission,
}: {
  mission: SendMissionRequest;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
    },
  });
  async function onSubmit(values: any) {
    const params = {
      ...values,
      length: mission.sequenceItems.length,
      seq: mission.toJson(),
    };
    const { data, status } = await addSequence(params);
    if (status === 201) {
      close();
      form.reset();
      alert("Sequence added successfully");
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Send mission">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Input.Wrapper id="input-demo" withAsterisk label="Name">
            <Input
              id="input-demo"
              placeholder="Sequence Name"
              {...form.getInputProps("name")}
            />
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" withAsterisk label="Description">
            <Input
              id="input-demo"
              placeholder="Sequence Description"
              {...form.getInputProps("description")}
            />
          </Input.Wrapper>
          <Button type="submit" className="btn btn-primary btn-md mt-5 ml-auto">
            Create sequence
          </Button>
        </form>
      </Modal>
      <div className="btn w-1/3 self-center bg-blue-500" onClick={open}>
        Create Sequence
      </div>
    </>
  );
}
