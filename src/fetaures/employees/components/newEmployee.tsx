
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

import { nanoid } from "@reduxjs/toolkit";

type Props = {
    open: boolean;
    onClose: () => void;
};

const NewEmployee: React.FC<Props> = ({ open, onClose }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields().then((values) => {
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
            message.success(`successfully added new Employee ${newEmployee.name}`)
            form.resetFields();
            onClose();
        });
    };

    return (
        <Modal
            open={open}
            title="Add New Employee"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                // loading={loadings[3] && { icon: <SyncOutlined spin /> }}
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
                            rules={[{ required: true }]}
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
                        <Form.Item label="Phone" name="phone">
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
                            rules={[{ required: true }]}
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
                            rules={[{ required: true }]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default NewEmployee;