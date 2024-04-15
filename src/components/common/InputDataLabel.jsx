import { useState } from "react";
import { Input, Select } from "../common";
import { useDistinctValues } from "../utils";

const InputDataLabel = ({
  label,
  value,
  setValue,
  dataKey,
  required = true,
}) => {
  const existingValues = useDistinctValues(dataKey);
  const [addNewValue, setAddNewValue] = useState(false);
  return (
    <div>
      {addNewValue ? (
        <>
          <Input
            label={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            list={label + "-list"}
            required={required}
          />
          <datalist id={label + "-list"}>
            {existingValues.map((val) => (
              <option key={val} value={val} />
            ))}
          </datalist>
        </>
      ) : (
        <>
          <Select
            label={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={required}
          >
            <option value="">Select Status</option>
            {existingValues.map((value) => (
              <option key={value} value={value} className="capitalize">
                {value}
              </option>
            ))}
          </Select>
          <div
            className="flex justify-end text-sm text-primary cursor-pointer mt-1"
            onClick={() => setAddNewValue(true)}
          >
            Add a new {label}
          </div>
        </>
      )}
    </div>
  );
};

export default InputDataLabel;
