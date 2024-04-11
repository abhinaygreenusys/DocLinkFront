const Checkbox = ({
  id,
  value,
  onChange,
  text,
  className = "",
  required = false,
}) => {
  return (
    <div className={`checkbox-group ${className}`}>
      <input
        type="checkbox"
        id={id || text}
        name={id || text}
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={id || text}>{text}</label>
    </div>
  );
};

export default Checkbox;
