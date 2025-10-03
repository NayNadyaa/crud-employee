import React, { useEffect, useState } from "react";
import type { Employee } from "../../types/Employee";
import { getEmployees } from "../../hooks/services/employeeService";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import EmployeeFormModal from "../shared/FormEmployee/EmployeeFormModal";
import LoadingSpinner from "../shared/Loading/LoadingSpinner";
import OverlaySpinner from "../shared/Loading/OverlaySpinner";
import EmployeeDetailModal from "../shared/FormEmployee/EmployeeDetailModal";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";

const Home: React.FC = () => {
  
  const [employees, setEmployees] = useSessionStorage<Employee[]>('employees', []);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [saving, setSaving] = useState(false); 
  const [deleting, setDeleting] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (!employees?.length) {
      setLoading(true);
      getEmployees().then((data) => {
        setEmployees(data);
        setLoading(false);
      });
    }
  }, [employees, employees?.length]);

  const handleDetail = (emp: Employee) => {
    setDetailEmployee(emp);
  };

  const handleSave = (employee: Employee) => {
    setSaving(true);
    const newData = {
      ...employee,
      salary: Number(employee.salary),
      age: Number(employee.age),
    };

    setTimeout(() => {
        if (selectedEmployee) {
            const updated = employees.map((e) =>
                e.id === employee.id ? employee : e
            );
            setEmployees(updated);
        } else {
            setEmployees([{ ...newData }, ...employees]);
        }

        setSaving(false);
        setShowModal(false);
    }, 2000);
  };


  const handleDelete = (id: number) => {
  if (confirm("Are you sure want to delete this data?")) {
    setDeleting(true);

    setTimeout(() => {
      setEmployees(employees.filter((emp) => emp.id !== id));
      setDeleting(false);
    }, 2000);
  }
};

  return (
    <div className="bg-white shadow-md p-6">
        { deleting && <OverlaySpinner /> }
        
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold mb-3 text-gray-800">Employee List</h2>
            <button 
                onClick={() => {
                    setSelectedEmployee(null);
                    setShowModal(true);
                }}
                className="text-white px-4 py-2 rounded"
            >
                + Add Employee
            </button>
        </div>

        { loading ? (
            <div className="flex justify-center py-4">
                <LoadingSpinner size="w-12 h-12" color="border-grey-500" />
            </div>
        ) : (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-white border-b border-gray-300 text-gray-700 text-left">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Position</th>
                        <th className="px-4 py-3">Salary</th>
                        <th className="px-4 py-3">Age</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                { employees.map((emp, index) => (
                    <tr
                        key={emp.id}
                        className={`transition duration-200 ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50`}
                    >
                        <td className="px-4 py-3 border-b text-gray-700">{emp.id}</td>
                        <td className="px-4 py-3 border-b font-medium text-gray-700">
                            {emp.name}
                        </td>
                        <td className="px-4 py-3 border-b text-gray-700">{emp.position}</td>
                        <td className="px-4 py-3 border-b font-semibold text-gray-700">
                            Rp {emp.salary.toLocaleString("id-ID")}
                        </td>
                        <td className="px-4 py-3 border-b text-gray-700">{emp.age}</td>
                        <td className="px-4 py-3 border-b text-center space-x-2 text-gray-700">
                            <button
                                onClick={() => handleDetail(emp)}
                                className="text-white px-3 py-1 rounded-md shadow"
                            >
                                <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedEmployee(emp);
                                    setShowModal(true);
                                }}
                                className="text-white px-3 py-1 rounded-md shadow"
                            >
                                <PencilSquareIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(emp.id)}
                                className="text-white px-3 py-1 rounded-md shadow"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                ))}

                { employees.length === 0 && (
                    <tr>
                    <td
                        colSpan={6}
                        className="text-center text-gray-500 py-6 italic"
                    >
                        Empty Data
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        )}

        { showModal && (
            <EmployeeFormModal
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                employee={selectedEmployee}
                saving={saving}
            />
        )}

        { detailEmployee && (
            <EmployeeDetailModal
                employee={detailEmployee}
                onClose={() => setDetailEmployee(null)}
            />
        )}
    </div>
  );
};

export default Home;
