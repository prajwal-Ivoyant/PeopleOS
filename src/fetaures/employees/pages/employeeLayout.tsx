import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
    selectEmployees,
    selectActiveEmployees,
    selectInactiveEmployees,
} from "../employeeSelectors";

import { selectDepartmentCounts } from "../utils/deptExtract";
import { EmployeeSortEnum } from "../employeeTypes";

import EmployeesFilter from "../components/employeesFilter";
import EmployeeSidebarFilters from "../components/employeesSideBar";
import EmployeeList from "../components/employeesList";

import { Flex, Layout, Typography } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography

import "./employeeLayout.css"

function EmployeeLayout() {

    const employees = useAppSelector(selectEmployees);
    const activeEmployees = useAppSelector(selectActiveEmployees);
    const inactiveEmployees = useAppSelector(selectInactiveEmployees);
    const departmentCounts = useAppSelector(selectDepartmentCounts);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [department, setDepartment] = useState("all");

    const [sort, setSort] = useState<EmployeeSortEnum>(
        EmployeeSortEnum.NAME_ASC
    );

    return (
        <Layout className="app-layout">
            <Header className="app-header">
                <EmployeesFilter
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                />
            </Header>

            <Layout className="app-body">
                <Sider width={280} className="app-sider">
                    <EmployeeSidebarFilters
                        totalCount={employees.length}
                        activeCount={activeEmployees.length}
                        inactiveCount={inactiveEmployees.length}
                        departmentCounts={departmentCounts}
                        selectedStatus={status}
                        setSelectedStatus={setStatus}
                        selectedDepartment={department}
                        setSelectedDepartment={setDepartment}
                    />
                </Sider>

                <Content className="app-content">
                    <Flex className="content-header">

                        <Title level={2} className="content-title">
                            All Employees
                        </Title>

                        <span className="content-count">
                            {activeEmployees.length} active people
                        </span>
                    </Flex>
                    <EmployeeList
                        employees={employees}
                        activeEmployees={activeEmployees}
                        inactiveEmployees={inactiveEmployees}
                        department={department}
                        search={search}
                        sort={sort}
                        status={status}
                    />
                </Content>
            </Layout>

            <Footer className="app-footer">Footer</Footer>
        </Layout>
    );
}

export default EmployeeLayout