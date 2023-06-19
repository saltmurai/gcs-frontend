import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, NumberInput, Input } from "@mantine/core";
import AddPackages from "./AddPackagesModal";
import { getPackages } from "@/api/api";
import PackagesTable from "./PackagesTable";

export default function Packages() {
  return (
    <>
      <div className="h-full w-full flex-1 bg-white p-2">
        <AddPackages />
        <PackagesTable />
      </div>
    </>
  );
}
