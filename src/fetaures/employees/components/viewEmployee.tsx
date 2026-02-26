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
    DatePicker,
    message,
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

import dayjs from "dayjs";

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

    const [isFormChanged, setIsFormChanged] = useState(false);

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
                phone: employee.phone,
                salary: employee.salary,
                joinedDate: employee.joinedDate
                    ? dayjs(employee.joinedDate)
                    : null,
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
                joinedDate: values.joinedDate.format("YYYY-MM-DD"),
            };

            dispatch(updateEmployee(updatedEmployee));
            message.success(
                `Updated ${updatedEmployee.name} successfully`
            );

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
                form.resetFields();
                setIsEditing(false);
                onClose();
            }}
            centered
            width={850}
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
                            disabled={
                                !isFormChanged ||
                                form.getFieldsError().some(({ errors }) => errors.length)
                            }
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
                                message.success(
                                    `Successfully deleted ${employee.name}`
                                );
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


            <Form
                form={form}
                layout="vertical"

                onValuesChange={() => {
                    setIsFormChanged(true);
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        {isEditing ? (
                            <Form.Item
                                label="Full Name"
                                name="name"
                                rules={[{
                                    required: true,
                                    message: "Name is required"
                                },
                                {
                                    pattern: /^[A-Za-z\s]+$/,
                                    message: "Only letters and spaces are allowed"
                                }
                                ]}
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
                                rules={[
                                    { required: true },
                                    { type: "email" },
                                ]}
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
                            <Form.Item label="Phone" name="phone" rules={[
                                { required: true, message: "Phone number required" },
                                {
                                    pattern: /^[0-9]{10}$/,
                                    message: "Phone must be 10 digits"
                                }
                            ]}>
                                <Input />
                            </Form.Item>
                        ) : (
                            <>
                                <Text strong>Phone Number</Text>
                                <br />
                                <Text>{employee.phone}</Text>
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
                                rules={[
                                    { required: true, type: "number", message: "Salary must be a Number" },
                                    {
                                        type: "number",
                                        min: 10000,
                                        message: "Salary must be greater than 10000"

                                    }
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        ) : (
                            <>
                                <Text strong>Salary</Text>
                                <br />
                                <Text>
                                    ₹{employee.salary.toLocaleString()}
                                </Text>
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
                                <DatePicker style={{ width: "100%" }}
                                    disabledDate={(current) =>
                                        current && current > dayjs().endOf("day")
                                    }
                                />
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