import { useRef, useEffect } from "react";
import "./input.css";

const TextArea = ({
  label,
  rows = 4,
  value,
  onChange,
  required = false,
  className = "",
  disabled = false,
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
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        ref={inputRef}
        placeholder="."
        disabled={disabled}
        autoComplete="new-password"
      />
      <label ref={labelRef}>{label}</label>
    </div>
  );
};

export default TextArea;
