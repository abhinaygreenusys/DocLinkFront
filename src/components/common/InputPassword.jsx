import { useState } from "react";
import Input from "./Input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputPassword = ({
  value,
  onChange,
  label,
  className = "",
  required = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      <Input
        type={showPassword ? "text" : "password"}
        label={label}
        value={value}
        onChange={onChange}
        className={`pr-14 ${className}`}
        required={required}
        disabled={disabled}
      />
      <span
        className="absolute right-0 top-0 text-xl cursor-pointer p-4"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
      </span>
    </div>
  );
};

export default InputPassword;
