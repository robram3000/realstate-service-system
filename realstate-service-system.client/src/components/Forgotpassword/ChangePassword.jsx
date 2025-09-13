import React, { useState } from 'react';
import { Form, Input, Button, message, Alert, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import BaseFP from './BaseFP';

const ChangePassword = ({ onSuccess, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);

        try {
            // Simulate API call to change password
            await new Promise(resolve => setTimeout(resolve, 1500));
            message.success('Password changed successfully');
            onSuccess();
        } catch (error) {
            message.error('Failed to change password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseFP
            title="Set New Password"
            subtitle="Create a strong, secure password"
            onBack={onBack}
        >
            <Alert
                message="Your new password must be different from previous passwords."
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
            />

            <Form
                form={form}
                name="passwordForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="New Password"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Confirm Password"
                        size="large"
                    />
                </Form.Item>

                <Form.Item>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            size="large"
                            icon={<LockOutlined />}
                        >
                            Reset Password
                        </Button>
                        <Button
                            onClick={onBack}
                            block
                            size="large"
                        >
                            Back
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </BaseFP>
    );
};

export default ChangePassword;