import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const OverlaySpinner: React.FC<{ text?: string }> = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <LoadingSpinner size="w-12 h-12" color="border-white" />
    </div>
  );
};

export default OverlaySpinner;
