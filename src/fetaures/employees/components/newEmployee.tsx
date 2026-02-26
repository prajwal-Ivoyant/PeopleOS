
import {
    Modal,
    Row,
    Col,
    Input,
    InputNumber,
    Button,
    Select,
    DatePicker,
    Form, message,
} from "antd";

import { SaveOutlined, SyncOutlined } from "@ant-design/icons";
import { addEmployee } from "../../employeeSlice";
import { useAppDispatch } from "../../../app/hooks";

import dayjs from "dayjs";

import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
};

const NewEmployee: React.FC<Props> = ({ open, onClose }) => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const values = Form.useWatch([], form);

    const isFormComplete =
        values?.name &&
        values?.email &&
        values?.role &&
        values?.department &&
        values?.status &&
        values?.salary &&
        values?.joinedDate;

    const handleSave = async () => {
        try {
            setLoading(true);

            const values = await form.validateFields();

            await new Promise((resolve) =>
                setTimeout(resolve, 3000)
            );

            const newEmployee = {
                id: nanoid(),
                name: values.name,
                email: values.email,
                phone: values.phone,
                role: values.role,
                department: values.department,
                salary: values.salary,
                status: values.status,
                joinedDate: values.joinedDate.format("YYYY-MM-DD"),
            };

            dispatch(addEmployee(newEmployee));

            message.success(
                `Successfully added new Employee ${newEmployee.name}`
            );

            form.resetFields();
            onClose();
        } catch (err) {
            message.error("Validation Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            title="Add New Employee"
            onCancel={onClose}
            centered
            width={850}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                    loading={loading && { icon: <SyncOutlined spin /> }}
                    disabled={!isFormComplete}
                >
                    Save
                </Button>,
            ]}
        >
            <Form layout="vertical" form={form}>
                <Row gutter={16}>
                    <Col span={12}>
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
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: "email" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Phone" name="phone" rules={[
                            {
                                pattern: /^[0-9]{10}$/,
                                message: "Phone must be 10 digits"
                            }
                        ]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Department"
                            name="department"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { label: "IT", value: "IT" },
                                    { label: "HR", value: "HR" },
                                    { label: "Finance", value: "Finance" },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { label: "active", value: "active" },
                                    { label: "inactive", value: "inactive" },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
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
                            <InputNumber
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Date Joined"
                            name="joinedDate"
                            rules={[
                                { required: true, message: "Joined date is required" },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                disabledDate={(current) =>
                                    current && current > dayjs().endOf("day")
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default NewEmployee;
