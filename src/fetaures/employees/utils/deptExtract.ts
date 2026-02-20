
import type { RootState } from "../../../app/store";

import type { EmployeeType } from "../employeeTypes";


export const selectDepartmentCounts = (state: RootState) => {
    const employees = state.employees.employees;

    return employees.reduce((acc: Record<string, number>, emp) => {
        const dept = emp.department || "Unknown";
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
    }, {});
};

export const FilterByDept = (
    employees: EmployeeType[],
    department: string
) => {
    if (!department || department === "all") {
        return employees;
    }

    return employees.filter(
        (e) => e.department === department
    );
};