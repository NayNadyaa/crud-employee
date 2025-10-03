import React from "react";

interface Props {
  size?: string;
  color?: string;
}

const LoadingSpinner: React.FC<Props> = ({
  size = "w-8 h-8",
  color = "border-blue-500",
}) => {
  return (
    <div
      className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
    ></div>
  );
};

export default LoadingSpinner;
