import { getPackages } from "@/api/api";
import { Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";

export default function PackagesTable() {
  const { data, isLoading, isError } = useQuery(["packages"], getPackages);
  if (isLoading) {
    return (
      <div>
        <HashLoader />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <div className="overflow-x-auto mt-5">
      <Table withBorder withColumnBorders striped highlightOnHover>
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Weight(kg)</th>
            <th>Height(m)</th>
            <th>Length(m)</th>
            <th>Sender Name</th>
            <th>Receiver Name</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((p: any) => {
            return (
              <tr key={p.ID}>
                <th>{p.ID}</th>
                <td>{p.Name}</td>
                <td>{p.Weight}</td>
                <td>{p.Height}</td>
                <td>{p.Length}</td>
                <td>{p.SenderName}</td>
                <td>{p.ReceiverName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
