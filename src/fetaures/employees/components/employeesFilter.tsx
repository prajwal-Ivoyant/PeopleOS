import { Flex, Input, Select, Space, Typography, Button } from "antd";
import type { EmployeeSortEnum } from "../employeeTypes";
import { EmployeeSortEnum as SortValues } from "../employeeTypes";

const { Title } = Typography;
import { TeamOutlined, PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

type Props = {
    search: string;
    setSearch: (v: string) => void;

    sort: EmployeeSortEnum;
    setSort: (v: EmployeeSortEnum) => void;
};

const EmployeesFilter = ({ search, setSearch, sort, setSort }: Props) => {
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
                            { value: SortValues.NAME_DESC, label: "Name Z-A" },
                            { value: SortValues.SALARY_ASC, label: "Salary Low-High" },
                            { value: SortValues.SALARY_DESC, label: "Salary High-Low" },
                        ]}
                    />

                    <Button type="primary" icon={<PlusOutlined />}>
                        Add Employee
                    </Button>
                </Space>
            </Flex>
        </>
    );
};

export default EmployeesFilter;
