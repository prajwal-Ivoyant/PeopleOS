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

import { Flex, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

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
        <Flex>
            <Layout >
                <Header  >
                    <EmployeesFilter
                        search={search}
                        setSearch={setSearch}
                        sort={sort}
                        setSort={setSort}
                    />
                </Header>


                <Layout>

                    <Sider width="20%">
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
                    <Content >
                        <EmployeeList
                            employees={employees}
                            activeEmployees={activeEmployees}
                            inactiveEmployees={inactiveEmployees}
                            department={department}
                            search={search}
                            sort={sort}
                            status={status}


                        ></EmployeeList>
                    </Content>

                </Layout>
                <Footer  >Footer</Footer>
            </Layout>
        </Flex >
    )
}

export default EmployeeLayout