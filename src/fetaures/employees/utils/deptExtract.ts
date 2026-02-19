import type { RootState } from "../../../app/store";


export const selectDepartmentCounts = (state: RootState) => {
    const employees = state.employees.employees;

    return employees.reduce((acc: Record<string, number>, emp) => {
        const dept = emp.department || "Unknown";
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
    }, {});
};