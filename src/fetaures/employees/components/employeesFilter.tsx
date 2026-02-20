import { Flex, Input, Select, Space, Typography, Button } from "antd";
import type { EmployeeSortEnum } from "../employeeTypes";
import { EmployeeSortEnum as SortValues } from "../employeeTypes";

const { Title } = Typography;
import { TeamOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import NewEmployee from "./newEmployee";

const { Search } = Input;

type Props = {
    search: string;
    setSearch: (v: string) => void;

    sort: EmployeeSortEnum;
    setSort: (v: EmployeeSortEnum) => void;
};

const EmployeesFilter = ({ search, setSearch, sort, setSort }: Props) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleNewEmployee = () => {
        setIsOpen(true)
    }


    return (
        <>
            <Flex
                justify="space-between"
                align="center"

            >

                <Flex align="center" gap={12}>
                    <Title level={4} >
                        <TeamOutlined />
                        PeopleOS
                    </Title>
                </Flex>


                <Space size="middle">
                    <Search
                        placeholder="Search employees, roles, departments..."
                        value={search}
                        allowClear
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: 320 }}
                    />

                    <Select<EmployeeSortEnum>
                        value={sort}
                        onChange={(value) => setSort(value)}
                        style={{ width: 200 }}
                        options={[
                            { value: SortValues.NAME_ASC, label: "Name A-Z" },

                            { value: SortValues.SALARY_ASC, label: "Salary Low-High" },
                            { value: SortValues.SALARY_DESC, label: "Salary High-Low" },
                            { value: SortValues.DATE_JOIN, label: "Date Join" },
                            { value: SortValues.DEPARTMENT, label: "Department" },
                        ]}
                    />

                    <Button type="primary" icon={<PlusOutlined />} onClick={() => handleNewEmployee()}>
                        Add Employee
                    </Button>
                </Space>
            </Flex>

            {isOpen && (
                <NewEmployee
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}


        </>
    );
};

export default EmployeesFilter;
