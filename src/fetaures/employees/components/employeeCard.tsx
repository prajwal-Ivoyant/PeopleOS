import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { deleteEmployee,  } from "../../employeeSlice";//toggleEmployeeStatus
import type { EmployeeType } from "../employeeTypes";

import { Card, Typography, Tag, Space, Button, Popconfirm, Divider, } from "antd";

import {
    EditOutlined,
    DeleteOutlined,
    // SyncOutlined,
    MailOutlined,
    ApartmentOutlined,
    CrownOutlined,
    CalendarOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

type Props = {
    employee: EmployeeType;
};

const EmployeeCard = ({ employee }: Props) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const isActive = employee.status === "active";

    return (
        <>
            <Card hoverable>
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

                    <Space wrap>
                        <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>

                        {/* <Button
                            icon={<SyncOutlined />}
                            onClick={() => dispatch(toggleEmployeeStatus(employee.id))}
                        >
                            Toggle Status
                        </Button> */}

                        <Popconfirm
                            title="Delete employee?"
                            description="This action cannot be undone."
                            okText="Delete"
                            cancelText="Cancel"
                            onConfirm={() => dispatch(deleteEmployee(employee.id))}
                        >
                            <Button danger icon={<DeleteOutlined />}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Space>
                </Space>
            </Card>

            {isEditing && (
                console.log("editinggggggggggg...")
            )}
        </>
    );
};

export default EmployeeCard;
