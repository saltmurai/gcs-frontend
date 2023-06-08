export default function PackagesTable() {
  return (
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
  );
}
