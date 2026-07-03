import React from "react";
import type { ButtonProps } from "../utils/Interface";

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    warning: "bg-yellow-400 text-white hover:bg-yellow-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium transition
        ${variants[variant]}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed hover:bg-inherit"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;