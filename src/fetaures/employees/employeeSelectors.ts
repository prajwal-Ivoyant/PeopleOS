import type { RootState } from "../../app/store";
import type { EmployeeType } from "./employeeTypes";



export const selectEmployees = (state: RootState) => {
    console.log("select empl", state.employees.employees);
    return state.employees.employees;
};


export const selectActiveEmployees = (state: RootState) =>
    state.employees.employees.filter((e: EmployeeType) => e.status === "active");


export const selectInactiveEmployees = (state: RootState) =>
    state.employees.employees.filter((e: EmployeeType) => e.status === "inactive");




