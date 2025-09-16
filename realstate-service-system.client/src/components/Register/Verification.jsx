import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Space, Alert } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Verification = ({ email, onNext, onBack }) => {
    const [form] = Form.useForm();
    const [timer, setTimer] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const onFinish = (values) => {
        onNext();
    };

    const handleResendCode = () => {
        setTimer(60);
        setIsResendDisabled(true);
    };

    return (
        <div>
            <Title level={4} style={{ textAlign: 'center', marginBottom: '6px', color: '#1a3a4f', fontSize: '14px' }}>
                Verify Your Email
            </Title>
            <Divider style={{ margin: '16px 0', borderColor: '#d9d9d9' }} />
            <Text style={{ textAlign: 'center', display: 'block', marginBottom: '20px', color: '#2a5d7a', fontSize: '12px' }}>
                We've sent a 6-digit code to {email}
            </Text>

            <Alert
                message="Check your inbox"
                description="The verification code was sent to your email address. It may take a few minutes to arrive."
                type="info"
                showIcon
                style={{ marginBottom: '20px', fontSize: '12px' }}
            />

            <Form
                form={form}
                name="verification"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="code"
                >
                    <Input.OTP length={6} size="small" style={{ height: '30px', fontSize: '12px' }} />
                </Form.Item>

                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="small"
                        block
                        icon={<CheckOutlined style={{ fontSize: '12px' }} />}
                        style={{
                            height: '30px',
                            borderRadius: '4px',
                            fontWeight: 500,
                            backgroundColor: '#2a5d7a',
                            borderColor: '#2a5d7a',
                            fontSize: '12px'
                        }}
                    >
                        Verify Code
                    </Button>

                    <Button
                        onClick={onBack}
                        size="small"
                        block
                        icon={<ArrowLeftOutlined style={{ fontSize: '12px' }} />}
                        style={{
                            height: '30px',
                            borderRadius: '4px',
                            fontSize: '12px'
                        }}
                    >
                        Back
                    </Button>
                </Space>
            </Form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>Didn't receive the code? </Text>
                <Button
                    type="link"
                    onClick={handleResendCode}
                    disabled={isResendDisabled}
                    style={{ padding: 0, fontSize: '12px' }}
                >
                    {isResendDisabled ? `Resend in ${timer}s` : 'Resend code'}
                </Button>
            </div>
        </div>
    );
};


export default Verification;