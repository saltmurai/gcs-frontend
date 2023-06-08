import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, NumberInput, Input } from "@mantine/core";
import AddPackages from "./AddPackagesModal";

export default function Packages() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="h-full w-full flex-1 bg-white p-2">
        <AddPackages />
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Sender</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Package 1</td>
                <td>2.03</td>
                <td>Alice</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Package 2</td>
                <td>1.15</td>
                <td>Bob</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
