import {
  confirmMission,
  deleteMission,
  getImages,
  getImagesPath,
  sendMission,
} from "@/api/api";
import { Menu, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineSend,
  AiFillFolderOpen,
} from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";

export function MissionCard({
  props,
  refetch,
}: {
  props: any;
  refetch: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [missionImagesURL, setMissionImagesURL] = useState<string[]>([]);
  const handleSendMission = async () => {
    await sendMission(props.ID);
    refetch();
  };
  const handleDeleteMission = async () => {
    await deleteMission(props.ID);
    refetch();
  };

  const handleStartMission = async () => {
    await confirmMission({ id: props.ID, flag: "FLAG_ALLOW_TO_FLY" });
    refetch();
  };
  const handleViewImage = async () => {
    try {
      const res = await getImagesPath(props.ID);
      if (res.status === 200 && res.data) {
        // for each image path, get the image
        const imagesPromise = res.data.map(async (path: string) => {
          const res = await getImages(path);
          return URL.createObjectURL(res.data);
        });
        const images = await Promise.all(imagesPromise);
        setMissionImagesURL(images);
        console.log(images);
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Cannot get images from drone",
        color: "red",
      });
    }

    open();
  };

  const handleConfirm = async () => {
    try {
      await confirmMission({ id: props.ID, flag: "FLAG_CAM_ALLOW" });
      refetch();
      close();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Cannot confirm mission",
        color: "red",
      });
    }
  };

  const handleReject = async () => {
    try {
      await confirmMission({ id: props.ID, flag: "FLAG_CAM_REJECT" });
      refetch();
      close();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Cannot reject mission",
        color: "red",
      });
    }
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
              <Menu.Item
                icon={<GiCheckMark size={14} />}
                onClick={handleStartMission}
              >
                Start mission
              </Menu.Item>
              <Menu.Item
                icon={<AiOutlineSend size={14} />}
                onClick={handleSendMission}
              >
                Send mission to drone
              </Menu.Item>
              <Menu.Item
                icon={<AiFillFolderOpen size={14} />}
                onClick={handleViewImage}
              >
                View image from drone
              </Menu.Item>
              <Menu.Item
                icon={<AiOutlineDelete size={14} />}
                onClick={handleDeleteMission}
              >
                Delete Mission
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <div className="flex w-full">
          <span className="text-gray-500 flex-1">
            {`${props.DroneName} - ${props.PackageName} - ${props.SeqName}`}
          </span>
        </div>
        <span className="text-gray-500">Status: {props.Status}</span>
      </div>
      <Modal
        title="Image return from drone"
        opened={opened}
        onClose={close}
        size={"80vw"}
      >
        <div className="w-full flex">
          {missionImagesURL.map((url) => (
            <img
              key={url}
              src={url}
              alt="Mission image"
              className="w-1/3 h-auto object-contain"
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-5">
          <button className="btn bg-green-500" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="btn bg-red-500" onClick={handleReject}>
            Reject
          </button>
        </div>
      </Modal>
    </>
  );
}
