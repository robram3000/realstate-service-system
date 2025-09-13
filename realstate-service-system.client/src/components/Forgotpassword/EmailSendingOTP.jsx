import React, { useState } from 'react';
import { Form, Input, Button, message, Alert, Divider } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import BaseFP from './BaseFP';

const EmailSendingOTP = ({ onSuccess, onBack }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);

        try {
            // Simulate API call to send OTP
            await new Promise(resolve => setTimeout(resolve, 1500));
            message.success(`OTP sent to ${values.email}`);
            onSuccess(values.email);
        } catch (error) {
            message.error('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseFP
            title="Reset Password"
            subtitle="Enter your email to receive OTP"
            onBack={onBack}
        >
            <Alert
                message="Enter your email address and we'll send you a verification code."
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
            />

            <Form
                name="emailForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Enter your email address"
                        size="large"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        size="large"
                    >
                        Send Verification Code
                    </Button>
                </Form.Item>
            </Form>

            <Divider />

            <div style={{ textAlign: 'center' }}>
                <Text type="secondary">
                    Remember your password? <a href="#login">Back to login</a>
                </Text>
            </div>
        </BaseFP>
    );
};

export default EmailSendingOTP;