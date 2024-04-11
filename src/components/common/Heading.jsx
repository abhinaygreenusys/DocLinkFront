const Heading = ({
  level,
  fontWeight = "medium",
  className,
  id = null,
  children,
}) => {
  const Tag = level <= 6 ? `h${level}` : "h6";
  const fontSize = () => {
    switch (level) {
      case 1:
        return "text-4xl";
      case 2:
        return "text-3xl";
      case 3:
        return "text-2xl";
      case 4:
        return "text-xl";
      case 5:
        return "text-lg";
      case 6:
        return "text-base";
      default:
        return "text-base";
    }
  };
  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-semibold",
  };
  return (
    <Tag
      className={`${fontSize()} ${weights[fontWeight]} ${className} text-black`}
      {...(id && { id })}
    >
      {children}
    </Tag>
  );
};

export default Heading;
