<<<<<<< Updated upstream
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { deleteEmployee,  } from "../../employeeSlice";//toggleEmployeeStatus
=======
>>>>>>> Stashed changes
import type { EmployeeType } from "../employeeTypes";

import { Card, Typography, Tag, Space, Divider, Button } from "antd";

import {
<<<<<<< Updated upstream
    EditOutlined,
    DeleteOutlined,
    // SyncOutlined,
=======
>>>>>>> Stashed changes
    MailOutlined,
    ApartmentOutlined,
    CrownOutlined,
    CalendarOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

type Props = {
    employee: EmployeeType;
    onClick: () => void;
};

const EmployeeCard = ({ employee, onClick }: Props) => {

    const isActive = employee.status === "active";

    return (
        <>
            <Card
                hoverable

            >
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <Space style={{ width: "100%", justifyContent: "space-between" }}>
                        <Title level={5} style={{ margin: 0 }}>
                            {employee.name}
                        </Title>

                        <Tag color={isActive ? "green" : "blue"}>
                            {employee.status.toUpperCase()}
                        </Tag>
                    </Space>

                    <Divider style={{ margin: "8px 0" }} />

                    <Space direction="vertical" size={6}>
                        <Text>
                            <MailOutlined /> {employee.email}
                        </Text>

                        <Text>
                            <CrownOutlined /> {employee.role}
                        </Text>

                        <Text>
                            <ApartmentOutlined /> {employee.department}
                        </Text>

                        <Text>
                            <MoneyCollectOutlined /> ₹{employee.salary}
                        </Text>

                        <Text>
                            <CalendarOutlined /> {employee.joinedDate}
                        </Text>
                    </Space>

                    <Divider style={{ margin: "10px 0" }} />

                    <Button onClick={onClick} >View Details</Button>
                </Space>
            </Card>


        </>
    );
};

export default EmployeeCard;
