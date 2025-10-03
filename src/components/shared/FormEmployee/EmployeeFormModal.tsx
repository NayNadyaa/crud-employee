import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Employee } from "../../../types/Employee";
import LoadingSpinner from "../Loading/LoadingSpinner";

interface Props {
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employee?: Employee | null;
  saving?: boolean;
}

const EmployeeFormModal: React.FC<Props> = ({ onClose, onSave, employee, saving }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: {
      id: 0,
      name: "",
      position: "",
      salary: 0,
      age: 0,
    },
  });

  useEffect(() => {
    if (employee) {
      setValue("id", employee.id);
      setValue("name", employee.name);
      setValue("position", employee.position);
      setValue("salary", employee.salary);
      setValue("age", employee.age);
    }
  }, [employee, setValue]);

  const onSubmit = (data: Employee) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-gray-700 text-lg font-bold mb-4">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("id")}
            disabled
            className="w-full border p-2 rounded bg-gray-100 text-gray-500"
          />

          <div>
            <input
              {...register("name", { required: "Name is required" })}
              disabled={saving}
              placeholder="Name"
              className="w-full border p-2 rounded text-black"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("position", { required: "Position is required" })}
              disabled={saving}
              placeholder="Position"
              className="w-full border p-2 rounded text-black"
            />
            {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
          </div>

          <div>
            <input
              type="number"
              {...register("salary", {
                min: { value: 0, message: "Salary cannot be negative" },
              })}
              disabled={saving}
              placeholder="Salary"
              className="w-full border p-2 rounded text-black"
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          <div>
            <input
              {...register("age", {
                min: { value: 0, message: "Age cannot be negative" },
              })}
              type="number"
              disabled={saving}
              placeholder="Age"
              className="w-full border p-2 rounded text-black"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {saving ? (
                <div className="flex items-center space-x-2">
                  <span>Saving</span>
                  <LoadingSpinner size="w-5 h-5" color="border-white" />
                </div>
              ) : employee ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
