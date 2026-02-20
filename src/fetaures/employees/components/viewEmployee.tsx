import React, { useState, useEffect } from "react";
import {
    Modal,
    Row,
    Col,
    Typography,
    Avatar,
    Divider,
    Button,
    Popconfirm,
    Tag,
    Flex,
    Form,
    Input,
    Select,
} from "antd";

import {
    EditOutlined,
    DeleteOutlined,
    SyncOutlined,
} from "@ant-design/icons";

import {
    deleteEmployee,
    toggleEmployeeStatus,
    updateEmployee,
} from "../../employeeSlice";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectEmployees } from "../employeeSelectors";

const { Title, Text } = Typography;

type ViewEmployeeProps = {
    employeeId: string;
    open: boolean;
    onClose: () => void;
};

const ViewEmployee: React.FC<ViewEmployeeProps> = ({
    employeeId,
    open,
    onClose,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const employee = useAppSelector((state) =>
        selectEmployees(state).find((e) => e.id === employeeId)
    );

    useEffect(() => {
        if (isEditing && employee) {
            form.setFieldsValue({
                name: employee.name,
                email: employee.email,
                department: employee.department,
                role: employee.role,
                salary: employee.salary,
                joinedDate: employee.joinedDate,
            });
        }
    }, [isEditing, employee, form]);

    if (!employee) return null;

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const updatedEmployee = {
                ...employee,
                ...values,
            };

            dispatch(updateEmployee(updatedEmployee));
            console.log("helllloooo", updatedEmployee)
            setIsEditing(false);
        } catch (err) {
            console.log("Validation failed");
        }
    };

    const handleCancelEdit = () => {
        form.resetFields();
        setIsEditing(false);
    };

    return (
        <Modal
            open={open}
            title="Employee Details"
            onCancel={() => {
                setIsEditing(false);
                onClose();
            }}
            footer={
                isEditing
                    ? [
                        <Button key="cancel" onClick={handleCancelEdit}>
                            Cancel
                        </Button>,
                        <Button
                            key="save"
                            type="primary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>,
                    ]
                    : [
                        <Button
                            key="toggle"
                            icon={<SyncOutlined />}
                            onClick={() =>
                                dispatch(toggleEmployeeStatus(employee.id))
                            }
                        >
                            Toggle Status
                        </Button>,

                        <Popconfirm
                            key="delete"
                            title="Delete employee?"
                            onConfirm={() => {
                                dispatch(deleteEmployee(employee.id));
                                onClose();
                            }}
                        >
                            <Button danger icon={<DeleteOutlined />}>
                                Delete
                            </Button>
                        </Popconfirm>,
                    ]
            }
        >
            <Flex align="center" gap={20} style={{ padding: 20 }}>
                <Avatar size={100}>
                    {employee.name.charAt(0)}
                </Avatar>

                <div>
                    <Title level={4} style={{ margin: 0 }}>
                        {employee.name}
                    </Title>

                    <Text type="secondary">{employee.role}</Text>
                    <br />

                    <Text type="secondary">
                        {employee.department}
                    </Text>
                    <br />

                    <Tag
                        color={
                            employee.status === "active"
                                ? "green"
                                : "red"
                        }
                    >
                        {employee.status}
                    </Tag>
                </div>
            </Flex>

            <Divider />

            <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 16 }}
            >
                <Title level={5}>Personal Information</Title>

                {!isEditing && (
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                )}
            </Row>

            <Form form={form} layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        {isEditing ? (
                            <Form.Item
                                label="Full Name"
                                name="name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        ) : (
                            <>
                                <Text strong>Full Name</Text>
                                <br />
                                <Text>{employee.name}</Text>
                            </>
                        )}
                    </Col>

                    <Col span={12}>
                        {isEditing ? (
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        ) : (
                            <>
                                <Text strong>Email</Text>
                                <br />
                                <Text>{employee.email}</Text>
                            </>
                        )}
                    </Col>

                    <Col span={12}>
                        {isEditing ? (
                            <Form.Item
                                label="Department"
                                name="department"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    options={[
                                        { label: "SWE", value: "SWE" },
                                        { label: "Cloud", value: "Cloud" },
                                        { label: "UI/UX", value: "UI/UX" },
                                        { label: "HR", value: "HR" },
                                    ]}
                                />
                            </Form.Item>
                        ) : (
                            <>
                                <Text strong>Department</Text>
                                <br />
                                <Text>{employee.department}</Text>
                            </>
                        )}
                    </Col>

                    <Col span={12}>
                        {isEditing ? (
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        ) : (
                            <>
                                <Text strong>Role</Text>
                                <br />
                                <Text>{employee.role}</Text>
                            </>
                        )}
                    </Col>

                    <Col span={12}>
                        {isEditing ? (
                            <Form.Item
                                label="Salary"
                                name="salary"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        ) : (
                            <>
                                <Text strong>Salary</Text>
                                <br />
                                <Text>₹{employee.salary}</Text>
                            </>
                        )}
                    </Col>

                    <Col span={12}>
                        {isEditing ? (
                            <Form.Item
                                label="Date Joined"
                                name="joinedDate"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        ) : (
                            <>
                                <Text strong>Date Joined</Text>
                                <br />
                                <Text>{employee.joinedDate}</Text>
                            </>
                        )}
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ViewEmployee;