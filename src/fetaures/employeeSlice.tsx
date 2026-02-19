import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { EmployeeType } from "./employees/employeeTypes";

import { employees } from "./employees/data";


interface EmployeeState {
    employees: EmployeeType[];
}

const initialState: EmployeeState = {
    employees,
};


const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {

        addEmployee: (state, action: PayloadAction<EmployeeType>) => {
            state.employees.push(action.payload);
        },

        deleteEmployee: (state, action: PayloadAction<String>) => {
            state.employees = state.employees.filter((emp) => emp.id !== action.payload);

        },

        updateEmployee: (
            state,
            action: PayloadAction<{ id: string; updatedData: Partial<EmployeeType> }
            >) => {

            const { id, updatedData } = action.payload;

            const index = state.employees.findIndex((emp) => emp.id === id);

            if (index != -1) {
                state.employees[index] = {
                    ...state.employees[index], ...updatedData
                }
            }

        },

        toggleEmployeeStatus: (state, action: PayloadAction<string>) => {
            const emp = state.employees.find((e) => e.id === action.payload);
            if (emp) {
                emp.status = emp.status === "active" ? "inactive" : "active";
            }
        }
    }
})


export const { addEmployee, deleteEmployee, updateEmployee, toggleEmployeeStatus } = employeeSlice.actions;

export default employeeSlice.reducer;