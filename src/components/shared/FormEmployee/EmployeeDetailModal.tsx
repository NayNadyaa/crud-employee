import React from "react";
import type { Employee } from "../../../types/Employee";

interface Props {
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeDetailModal: React.FC<Props> = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-gray-700 text-lg font-bold mb-4">Employee Detail</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>ID : </strong> {employee.id}</li>
          <li><strong>Name : </strong> {employee.name}</li>
          <li><strong>Position : </strong> {employee.position}</li>
          <li><strong>Salary : </strong> Rp {employee.salary.toLocaleString("id-ID")}</li>
          <li><strong>Age : </strong> {employee.age}</li>
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;
