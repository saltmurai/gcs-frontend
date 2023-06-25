// create axios backend

import { SendMissionRequest } from "@/gen/mission/v1/mission_pb";
import axios from "axios";
import exp from "constants";
import { list } from "postcss";

export const api = axios.create({
  baseURL: "http://localhost:3002",
});

// get drones
export const getDrones = async () => {
  const { data } = await api.get("/drones");
  return data;
};

export const resetDrones = async () => {
  const { data } = await api.post("/resetDrones");
  return data;
};

export const getActiveDrones = async () => {
  const { data } = await api.get("/activeDrones");
  return data;
};

export type AddDroneProp = {
  name: string;
  address: string;
};
export const addDrone = async (drone: AddDroneProp) =>
  api.post("/drones", drone);

export const deleteDrone = async (id: string) =>
  api.delete("/drones", { data: { id } });

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export type AddPackageProp = {
  name: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  senderID: string;
  receiverID: string;
};
export const addPackage = async (packageData: AddPackageProp) => {
  return await api.post("/packages", packageData);
};
export const getPackages = async () => {
  const { data } = await api.get("/packages");
  return data;
};

export type AddSequenceProp = {
  name: string;
  description: string;
  seq: SendMissionRequest;
};
export const addSequence = async (params: AddSequenceProp) => {
  return await api.post("/sequences", params);
};

export const getSequences = async () => {
  const { data } = await api.get("/sequences");
  return data;
};

export type AddMissionProp = {
  name: string;
  droneID: number;
  packageID: number;
  seqID: number;
};

export const addMission = async (params: AddMissionProp) => {
  return await api.post("/missions", params);
};

export const getMission = async () => {
  const { data } = await api.get("/missions");
  return data;
};

export const deleteMission = async (id: string) =>
  api.delete("/missions", { data: { id } });

export const sendMission = async (id: string) => api.post(`/sendMission/${id}`);

export const getImagesPath = async (id: number) => {
  return api.get(`/mission/images/${id}`);
};

export const getImages = async (imagePath: string) => {
  return api.post(
    "/images",
    { path: imagePath },
    {
      responseType: "blob",
    }
  );
};

export const confirmMission = async ({
  id,
  flag,
}: {
  id: number;
  flag: string;
}) => {
  return api.post(`/confirmation/${id}/${flag}`);
};
