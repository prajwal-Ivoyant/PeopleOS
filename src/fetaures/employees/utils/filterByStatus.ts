import type { EmployeeStatus, EmployeeType } from "../employeeTypes";


function FilterByStatus(employees: EmployeeType[], activeEmployees: EmployeeType[], inactiveEmployees: EmployeeType[], status: EmployeeStatus) {

    return status === "all"
        ? employees
        : status === "active"
            ? activeEmployees
            : inactiveEmployees;

}

export default FilterByStatus