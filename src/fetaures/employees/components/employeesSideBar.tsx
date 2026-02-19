import { Typography, List, Badge, Divider } from "antd";
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
    selectedStatus,
    setSelectedStatus,
    selectedDepartment,
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
                    actions={[<Badge count={totalCount} />]}
                >
                    <TeamOutlined style={{ marginRight: 8 }} />
                    <Text>All Employees</Text>
                </List.Item>

                <List.Item
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setSelectedStatus("active");
                        setSelectedDepartment("all");
                    }}
                    actions={[<Badge count={activeCount} />]}
                >
                    <CheckSquareOutlined />
                    <Text>Active</Text>
                </List.Item>

                <List.Item
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setSelectedStatus("inactive");
                        setSelectedDepartment("all");
                    }}
                    actions={[<Badge count={inactiveCount} />]}
                >
                    <StopOutlined />
                    <Text>Inactive</Text>
                </List.Item>
            </List>

            <Divider />

            <Text strong>DEPARTMENTS</Text>

            <List>
                {departments.map((dept) => (
                    <List.Item
                        key={dept}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setSelectedDepartment(dept);
                            setSelectedStatus("all");
                        }}
                        actions={[<Badge count={departmentCounts[dept]} />]}
                    >
                        <Text>{dept}</Text>
                    </List.Item>
                ))}
            </List>
        </div>

    );
};

export default EmployeeSidebarFilters;
