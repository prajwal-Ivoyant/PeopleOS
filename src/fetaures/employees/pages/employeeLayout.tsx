import { useState, useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
    selectEmployees,
    selectActiveEmployees,
    selectInactiveEmployees,
} from "../employeeSelectors";

import { selectDepartmentCounts } from "../utils/deptExtract";
import { EmployeeSortEnum, type EmployeeStatus } from "../employeeTypes";

import EmployeesFilter from "../components/employeesFilter";
import EmployeeSidebarFilters from "../components/employeesSideBar";
import EmployeeList from "../components/employeesList";

import { Flex, Layout, Typography, ConfigProvider, theme as antdTheme } from "antd";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

import "./employeeLayout.css";

function EmployeeLayout() {

    const employees = useAppSelector(selectEmployees);
    const activeEmployees = useAppSelector(selectActiveEmployees);
    const inactiveEmployees = useAppSelector(selectInactiveEmployees);
    const departmentCounts = useAppSelector(selectDepartmentCounts);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<EmployeeStatus>("all");
    const [department, setDepartment] = useState("all");

    const [theme, setTheme] = useState<"light" | "dark">("light");

    const [sort, setSort] = useState<EmployeeSortEnum>(
        EmployeeSortEnum.NAME_ASC
    );

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = savedTheme;   // important
        } else {
            document.body.className = "light";
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        document.body.className = newTheme;   // important

        localStorage.setItem("theme", newTheme);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    theme === "dark"
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
            }}
        >
            <Layout className={`app-layout ${theme}`}>

                <Header className="app-header">
                    <EmployeesFilter
                        search={search}
                        setSearch={setSearch}
                        sort={sort}
                        setSort={setSort}
                        toggleTheme={toggleTheme}
                        theme={theme}
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
        </ConfigProvider>
    );
}

export default EmployeeLayout;