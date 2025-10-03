import type { Employee } from "../../types/Employee";
import { employeeData } from "../../../public/mocks/employee";

export const getEmployees = async (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employeeData);
    }, 2000);
  });
};
