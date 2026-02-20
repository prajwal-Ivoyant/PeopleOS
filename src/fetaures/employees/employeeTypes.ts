
export type EmployeeStatus = 'active' | 'inactive';

export interface EmployeeType {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    department: string;
    salary: number;
    status: EmployeeStatus;
    joinedDate: string;

}


export const EmployeeSortEnum = {
    NAME_ASC: "name-asc",
    SALARY_ASC: "salary-asc",
    SALARY_DESC: "salary-desc",
    DATE_JOIN: "date-join",
    DEPARTMENT: "department",
} as const;

export type EmployeeSortEnum =
    (typeof EmployeeSortEnum)[keyof typeof EmployeeSortEnum];
