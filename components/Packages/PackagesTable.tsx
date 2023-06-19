import { getPackages } from "@/api/api";
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
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Lenght</th>
            <th>Sender</th>
            <th>Receiver</th>
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
      </table>
    </div>
  );
}
