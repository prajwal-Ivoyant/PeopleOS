import type { EmployeeType } from "../employeeTypes";

export const FilterBySearch = (
    employees: EmployeeType[],
    search: string
) => {
    const q = search.trim().toLowerCase();
    if (!q) return employees;

    return employees.filter((e) =>
        [e.name, e.email, e.role, e.department].some(
            (field) =>
                field.toLowerCase().includes(q)
        )
    );
};