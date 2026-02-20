import { Typography, List, Badge, Divider, Select } from "antd";
import {
    TeamOutlined,
    CheckSquareOutlined,
    StopOutlined,
} from "@ant-design/icons";
import "./employeesSideBar.css";


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
        <div className="sidebar-container">
            <Text className="sidebar-title">OVERVIEW</Text>

            <List className="sidebar-list">
                <List.Item
                    className={`sidebar-item ${selectedStatus === "all" ? "active-item" : ""
                        }`}
                    onClick={() => {
                        setSelectedStatus("all");
                        setSelectedDepartment("all");
                    }}
                    actions={[
                        <Badge key="all" count={totalCount} className="badge-pill" />,
                    ]}
                >
                    <TeamOutlined />
                    <Text>All Employees</Text>
                </List.Item>

                <List.Item
                    className={`sidebar-item ${selectedStatus === "active" ? "active-item" : ""
                        }`}
                    onClick={() => {
                        setSelectedStatus("active");

                    }}
                    actions={[
                        <Badge key="active" count={activeCount} className="badge-pill" />,
                    ]}
                >
                    <CheckSquareOutlined />
                    <Text>Active</Text>
                </List.Item>

                <List.Item
                    className={`sidebar-item ${selectedStatus === "inactive" ? "active-item" : ""
                        }`}
                    onClick={() => {
                        setSelectedStatus("inactive");
                    }}
                    actions={[
                        <Badge key="inactive" count={inactiveCount} className="badge-pill red-pill" />,
                    ]}
                >
                    <StopOutlined className="inactive-icon" />
                    <Text>Inactive</Text>
                </List.Item>
            </List>

            <Divider className="sidebar-divider" />

            <Text className="sidebar-title">DEPARTMENTS</Text>

            <Select
                className="department-select"
                placeholder="Select Department"
                value={selectedDepartment}
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