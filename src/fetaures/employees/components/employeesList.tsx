import { useMemo } from "react";

import EmployeeCard from "./employeeCard";

import type { EmployeeType } from "../employeeTypes";
import { EmployeeSortEnum } from "../employeeTypes";

import { Row, Col, Empty } from "antd";

type EmployeeListType = {
    employees: EmployeeType[],
    activeEmployees: EmployeeType[],
    inactiveEmployees: EmployeeType[],
    department: string,
    search: string,
    sort: EmployeeSortEnum,
    status: string,
}

const EmployeeList = ({ employees, activeEmployees, inactiveEmployees, department, search, sort, status }: EmployeeListType) => {

    const filteredEmployees = useMemo(() => {
        let data = [...employees];

        data =
            status === "all"
                ? [...employees]
                : status === "active"
                    ? activeEmployees
                    : inactiveEmployees;

        if (department !== "all") {
            data = data.filter((e) => e.department === department);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            data = data.filter(
                (e) =>
                    e.name.toLowerCase().includes(q) ||
                    e.email.toLowerCase().includes(q) ||
                    e.role.toLowerCase().includes(q) ||
                    e.department.toLowerCase().includes(q)
            );
        }

        switch (sort) {
            case EmployeeSortEnum.NAME_ASC:
                data.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case EmployeeSortEnum.NAME_DESC:
                data.sort((a, b) => b.name.localeCompare(a.name));
                break;

            case EmployeeSortEnum.SALARY_ASC:
                data.sort((a, b) => a.salary - b.salary);
                break;

            case EmployeeSortEnum.SALARY_DESC:
                data.sort((a, b) => b.salary - a.salary);
                break;

            default:
                break;
        }

        return data;
    }, [employees, search, status, department, sort]);

    return (
        <Row gutter={[16, 16]} style={{ padding: "20px" }}>

            {filteredEmployees.length === 0 ? (
                <Col span={24}>
                    <Empty description="No employees found" />
                </Col>
            ) : (
                filteredEmployees.map((emp) => (
                    <Col key={emp.id} span={8}>
                        <EmployeeCard employee={emp} />
                    </Col>
                ))
            )}
        </Row>

    );
};

export default EmployeeList;
