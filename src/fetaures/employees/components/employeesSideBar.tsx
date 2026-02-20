import { Typography, List, Badge, Divider, Select } from "antd";
import {
    TeamOutlined,
    CheckSquareOutlined,
    StopOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

type EmployeeSidebarFiltersProps = {
    totalCount: number;
    activeCount: number;
    inactiveCount: number;

    departmentCounts: Record<string, number>;

    selectedStatus: string;
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;

    selectedDepartment: string;
    setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
};

const EmployeeSidebarFilters = ({
    totalCount,
    activeCount,
    inactiveCount,
    departmentCounts,
    // selectedStatus,
    setSelectedStatus,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // selectedDepartment,
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
    setSelectedDepartment,
}: EmployeeSidebarFiltersProps) => {
    const departments = Object.keys(departmentCounts || {});

    return (
        <div style={{ margin: 24 }}>

            <Text strong>OVERVIEW</Text>

            <List >
                <List.Item
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setSelectedStatus("all");
                        setSelectedDepartment("all");
                    }}
                    actions={[<Badge count={totalCount} showZero color="#faad145f" />]}
                >
                    <TeamOutlined style={{ marginRight: 8 }} />
                    <Text>All Employees</Text>
                </List.Item>

                <List.Item
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setSelectedStatus("active");

                    }}
                    actions={[<Badge count={activeCount} showZero color="#3030302b" />]}
                >
                    <CheckSquareOutlined />
                    <Text>Active</Text>
                </List.Item>

                <List.Item
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setSelectedStatus("inactive");
                    }}
                    actions={[<Badge count={inactiveCount} showZero color="#3030302b" />]}
                >
                    <StopOutlined />
                    <Text>Inactive</Text>
                </List.Item>
            </List>

            <Divider />

            <Text strong>DEPARTMENTS</Text>

            <Select
                style={{ width: "100%", marginTop: 12 }}
                placeholder="Select Department"
                onChange={(value: string) => {
                    setSelectedDepartment(value);

                }}
                options={[
                    { label: "All", value: "all" },
                    ...departments.map((dept) => ({
                        label: `${dept} (${departmentCounts[dept]})`,
                        value: dept,
                    })),
                ]}
            />
        </div>

    );
};

export default EmployeeSidebarFilters;
