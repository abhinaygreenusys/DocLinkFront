import { useState } from "react";
import { useDistinctStatuses } from "../utils";
import { Input, Select } from "../common";

const InputStatus = ({ status, setStatus }) => {
  const statuses = useDistinctStatuses();
  const [addStatus, setAddStatus] = useState(false);
  return (
    <div>
      {addStatus ? (
        <>
          <Input
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            list={"statuses"}
            required
          />
          <datalist id="statuses">
            {statuses.map((status) => (
              <option key={status} value={status} />
            ))}
          </datalist>
        </>
      ) : (
        <>
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            {statuses.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status}
              </option>
            ))}
          </Select>
          <div
            className="flex justify-end text-sm text-primary cursor-pointer mt-1"
            onClick={() => setAddStatus(true)}
          >
            Add a new status
          </div>
        </>
      )}
    </div>
  );
};

export default InputStatus;
