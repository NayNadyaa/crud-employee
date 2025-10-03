import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <div className="basis-1/3">
            <p className="font-bold ml-1">CRUD project.</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
