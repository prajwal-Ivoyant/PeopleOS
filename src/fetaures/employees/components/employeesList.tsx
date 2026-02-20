import { useMemo, useState } from "react";
import { Row, Col, Empty } from "antd";

import EmployeeCard from "./employeeCard";
import ViewEmployee from "./viewEmployee";

import type { EmployeeType } from "../employeeTypes";
import { EmployeeSortEnum } from "../employeeTypes";
import { sortMapFilter } from "../utils/sortMap";
import { FilterBySearch } from "../utils/filterBySearch";
import { FilterByDept } from "../utils/deptExtract";

type EmployeeListType = {
    employees: EmployeeType[];
    activeEmployees: EmployeeType[];
    inactiveEmployees: EmployeeType[];
    department: string;
    search: string;
    sort: EmployeeSortEnum;
    status: string;
};

const EmployeeList = ({
    employees,
    activeEmployees,
    inactiveEmployees,
    department,
    search,
    sort,
    status,
}: EmployeeListType) => {
    const [openEmployee, setOpenEmployee] = useState("");

    const filteredEmployees = useMemo(() => {
        // 1️ Status filter
        let data =
            status === "all"
                ? employees
                : status === "active"
                    ? activeEmployees
                    : inactiveEmployees;

        // 2️ Department 
        console.log("dept", department, "serch", search, "sort", sort, data)
        data = FilterByDept(data, department);

        // 3️ Search 
        data = FilterBySearch(data, search);

        // 4️ Sorting
        data = sortMapFilter(data, sort);

        return data;
        
    }, [
        employees,
        activeEmployees,
        inactiveEmployees,
        department,
        search,
        sort,
        status,
    ]);

    const handleClick = (id: string) => {
        setOpenEmployee(id);
    };

    return (
        <>
            <Row gutter={[16, 16]} style={{ padding: 20 }}>
                {filteredEmployees.length === 0 ? (
                    <Col span={24}>
                        <Empty description="No employees found" />
                    </Col>
                ) : (
                    filteredEmployees.map((emp) => (
                        <Col
                            key={emp.id}
                            xs={24}
                            sm={12}
                            md={8}
                        >
                            <EmployeeCard
                                employee={emp}
                                onClick={() => handleClick(emp.id)}
                            />
                        </Col>
                    ))
                )}
            </Row>

            {openEmployee && (
                <ViewEmployee
                    employeeId={openEmployee}
                    open={true}
                    onClose={() =>
                        setOpenEmployee("")
                    }
                />
            )}
        </>
    );
};

export default EmployeeList;