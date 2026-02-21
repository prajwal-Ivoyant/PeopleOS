import type { EmployeeType } from "../employeeTypes";
import { Card, Typography, Tag, Space, Divider, Button } from "antd";
import {
    MailOutlined,
    ApartmentOutlined,
    CalendarOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";
import "./employeeCard.css";

const { Title, Text } = Typography;

type Props = {
    employee: EmployeeType;
    onClick: () => void;
};

const EmployeeCard = ({ employee, onClick }: Props) => {
    const isActive = employee.status === "active";

    return (
        <Card
            hoverable
            className={`employee-card ${isActive ? "active-card" : ""}`}
            bodyStyle={{ padding: 24 }}
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>

                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                    <div>
                        <Title level={5} className="employee-name">
                            {employee.name}
                        </Title>
                        <Text className="employee-role">{employee.role}</Text>
                    </div>

                    <Tag className={`status-tag ${isActive ? "active" : "inactive"}`}>
                        {employee.status.toUpperCase()}
                    </Tag>
                </Space>

                <Divider className="card-divider" />


                <Space direction="vertical" size={8} className="lowerCard">
                    <Text className="card-text">
                        <MailOutlined /> {employee.email}
                    </Text>

                    <Text className="card-text">
                        <ApartmentOutlined /> {employee.department}
                    </Text>

                    <Text className="card-text">
                        <CalendarOutlined /> {employee.joinedDate}
                    </Text>

                    <Text className="salary-text">
                        <MoneyCollectOutlined /> ₹{employee.salary}
                    </Text>
                </Space>

                <Divider className="card-divider" />

                <Button className="view-btn" block onClick={onClick}>
                    View Details →
                </Button>
            </Space>
        </Card>
    );
};

export default EmployeeCard;