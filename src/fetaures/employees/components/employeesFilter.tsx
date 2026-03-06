import { Flex, Input, Select, Space, Typography, Button } from "antd";
import type { EmployeeSortEnum } from "../employeeTypes";
import { EmployeeSortEnum as SortValues } from "../employeeTypes";
import { TeamOutlined, PlusOutlined, LoginOutlined } from "@ant-design/icons";
import { useState } from "react";
import NewEmployee from "./newEmployee";
import "./employeesFilter.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

type Props = {
    search: string;
    setSearch: (v: string) => void;

    sort: EmployeeSortEnum;
    setSort: (v: EmployeeSortEnum) => void;
};

const EmployeesFilter = ({ search, setSearch, sort, setSort }: Props) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const goToSignUpPage = () => {
        navigate("/sign-up")
    }

    return (
        <>
            <div className="people-header">
                <Flex justify="space-between" align="center">

                    <div className="logo-section">
                        <Title level={4} className="logo-text">
                            <TeamOutlined className="logo-icon" />
                            People <span className="highlight">OS</span>
                        </Title>
                    </div>

                    <Space size="middle">
                        <Search
                            className="search-input"
                            placeholder="Search employees, roles, departments..."
                            value={search}
                            allowClear
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <Select<EmployeeSortEnum>
                            className="sort-select"
                            value={sort}
                            onChange={(value) => setSort(value)}
                            options={[
                                { value: SortValues.NAME_ASC, label: "Name A-Z" },
                                { value: SortValues.SALARY_ASC, label: "Salary Low-High" },
                                { value: SortValues.SALARY_DESC, label: "Salary High-Low" },
                                { value: SortValues.DATE_JOIN, label: "Date Join" },

                            ]}
                        />

                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            className="add-btn"
                            onClick={() => setIsOpen(true)}

                        >
                            Add Employee
                        </Button>

                        <Button
                            type="primary"
                            icon={<LoginOutlined />}
                            className="add-btn"
                            onClick={goToSignUpPage}
                        >
                            Login / Sign-Up
                        </Button>

                    </Space>
                </Flex>
            </div>

            {isOpen && (
                <NewEmployee open={isOpen} onClose={() => setIsOpen(false)} />
            )}
        </>
    );
};

export default EmployeesFilter;