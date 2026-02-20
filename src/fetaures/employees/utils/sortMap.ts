
import { EmployeeSortEnum } from "../employeeTypes";
import type { EmployeeType } from "../employeeTypes";
import type { EmployeeSortEnum as SortType } from "../employeeTypes";


export const sortMap: Record<SortType, (a: EmployeeType, b: EmployeeType) => number> = {
  [EmployeeSortEnum.NAME_ASC]: (a, b) =>
    a.name.localeCompare(b.name),

  [EmployeeSortEnum.SALARY_ASC]: (a, b) =>
    a.salary - b.salary,

  [EmployeeSortEnum.SALARY_DESC]: (a, b) =>
    b.salary - a.salary,

  [EmployeeSortEnum.DATE_JOIN]: (a, b) =>
    new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime(),

  [EmployeeSortEnum.DEPARTMENT]: (a, b) =>
    a.department.toLowerCase().localeCompare(b.department.toLowerCase()),
};

export const sortMapFilter = (
  employees: EmployeeType[],
  sort: SortType
) => {
  if (!sort || !sortMap[sort]) {
    console.log("Invalid sort:", sort);
    return employees;
  }

  const sorted = [...employees].sort(sortMap[sort]);

  console.log("Sorting by:", sort);
  console.table(sorted);

  return sorted;
};