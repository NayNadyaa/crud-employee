import React, { useEffect, useState } from "react";
import type { Employee } from "../../../types/Employee";
import LoadingSpinner from "../Loading/LoadingSpinner";

interface Props {
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employee?: Employee | null;
  saving?: boolean;
}

const EmployeeFormModal: React.FC<Props> = ({ onClose, onSave, employee, saving }) => {
  const [form, setForm] = useState<Employee>({
    id: Date.now(),
    name: "",
    position: "",
    salary: 0,
    age: 0,
  });

  useEffect(() => {
    if (employee) {
      setForm(employee);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "salary" || name === "age" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.position) {
      alert("Name and Position is required");
      return;
    }
    onSave(form);
  };

 return (
  <div className="fixed inset-0 flex justify-center items-center">
    <div className="absolute inset-0 bg-black opacity-50"></div>

    <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-10">
      <h2 className="text-lg font-bold mb-4">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="id"
          value={form.id}
          disabled
          className="w-full border p-2 rounded bg-gray-100 text-gray-500"
        />
        <input
          name="name"
          value={form.name}
          disabled={saving}
          placeholder="Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="position"
          value={form.position}
          disabled={saving}
          placeholder="Position"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="salary"
          type="number"
          value={form.salary}
          disabled={saving}
          placeholder="Salary"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="age"
          type="number"
          value={form.age}
          disabled={saving}
          placeholder="Age"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-white rounded"
          >
            { saving ? (
                <div className="flex items-center space-x-2">
                  <span>Saving</span>
                  <LoadingSpinner size="w-5 h-5" color="border-white" />
                </div>
            ) : employee ? "Update" : "Save" }
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default EmployeeFormModal;
