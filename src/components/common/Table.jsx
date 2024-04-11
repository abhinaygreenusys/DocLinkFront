import "./table.css";

const Table = ({ tHead = [], wrapperClass = "", children, loading }) => {
  return (
    <div className={`w-full overflow-x-auto ${wrapperClass}`}>
      <table className="w-full">
        <thead>
          <tr>
            {tHead.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={tHead.length} className="text-center">
                Loading...
              </td>
            </tr>
          ) : children.length > 0 ? (
            children
          ) : (
            <tr>
              <td colSpan={tHead.length} className="text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
