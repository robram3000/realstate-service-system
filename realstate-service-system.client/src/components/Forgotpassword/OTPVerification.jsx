import React, { useState } from 'react';
import { Form, Input, Button, message, Alert, Space, Divider , Typography} from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import BaseFP from './BaseFP';

const { Text } = Typography;

const OTPVerification = ({ email, onSuccess, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);

        try {
            // Simulate API call to verify OTP
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock verification - in real app, verify against server
            if (values.otp === '123456') {
                message.success('OTP verified successfully');
                onSuccess();
            } else {
                message.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            message.error('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);

        try {
            // Simulate API call to resend OTP
            await new Promise(resolve => setTimeout(resolve, 1500));
            message.success('OTP sent again successfully');
        } catch (error) {
            message.error('Failed to resend OTP. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <BaseFP
            title="Verify Code"
            subtitle={`Enter the verification code sent to ${email}`}
            onBack={onBack}
        >
            <Alert
                message="Check your email for the 6-digit verification code."
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
            />

            <Form
                name="otpForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="otp"
                    rules={[
                        { required: true, message: 'Please input the verification code!' },
                        { len: 6, message: 'Code must be 6 digits!' }
                    ]}
                >
                    <Input.OTP length={6} size="large" />
                </Form.Item>

                <Form.Item>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            size="large"
                            icon={<SafetyCertificateOutlined />}
                        >
                            Verify Code
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

            <Divider />

            <div style={{ textAlign: 'center' }}>
                <Text type="secondary">
                    Didn't receive the code?{' '}
                    <Button
                        type="link"
                        onClick={handleResendOTP}
                        loading={resendLoading}
                        style={{ padding: 0 }}
                    >
                        Resend code
                    </Button>
                </Text>
            </div>
        </BaseFP>
    );
};

export default OTPVerification;