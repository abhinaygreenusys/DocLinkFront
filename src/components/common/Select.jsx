import { useRef, useEffect } from "react";
import "./input.css";

const Select = ({
  label,
  children,
  value,
  onChange,
  required = false,
  className = "",
}) => {
  const inputRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current.focus();
    };
    let labelNode = labelRef.current;
    labelNode.addEventListener("click", handleClick);
    return () => {
      labelNode.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className={"input-group " + className}>
      <select
        value={value}
        onChange={onChange}
        ref={inputRef}
        placeholder="."
        required={required}
      >
        {children}
      </select>
      <label ref={labelRef}>{label}</label>
    </div>
  );
};

export default Select;
