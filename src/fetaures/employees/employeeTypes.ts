
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
    NAME_DESC: "name-desc",
    SALARY_ASC: "salary-asc",
    SALARY_DESC: "salary-desc",
} as const;

export type EmployeeSortEnum =
    (typeof EmployeeSortEnum)[keyof typeof EmployeeSortEnum];
