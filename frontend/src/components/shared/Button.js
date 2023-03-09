import React from "react";

const Button = ({ children, version, type, isDisabled }) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      version={version}
      className={`btn btn-${version}`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};

export default Button;
