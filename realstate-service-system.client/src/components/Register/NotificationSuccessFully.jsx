import React from 'react';
import { Result, Button, Typography, Space } from 'antd';
import { CheckCircleFilled, MailOutlined } from '@ant-design/icons';


const { Title, Text, Paragraph } = Typography;

const NotificationSuccessfully = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <CheckCircleFilled style={{ color: '#52c41a', fontSize: '48px', marginBottom: '16px' }} />
            <Title level={4} style={{ textAlign: 'center', marginBottom: '6px', color: '#1a3a4f', fontSize: '14px' }}>
                Registration Successful!
            </Title>
            <Divider style={{ margin: '16px 0', borderColor: '#d9d9d9' }} />
            <Text style={{ textAlign: 'center', display: 'block', marginBottom: '20px', color: '#2a5d7a', fontSize: '12px' }}>
                Your account has been created successfully
            </Text>

            <div style={{ marginTop: '20px', padding: '0 20px' }}>
                <Paragraph style={{ fontSize: '12px', marginBottom: '12px' }}>
                    We've sent a confirmation email to your inbox. Please verify your email address to complete the registration process.
                </Paragraph>

                <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                    If you don't see the email in your inbox, please check your spam folder.
                </Paragraph>
            </div>

            <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }} size="middle">
                <Button
                    type="primary"
                    size="small"
                    block
                    style={{
                        height: '30px',
                        borderRadius: '4px',
                        fontWeight: 500,
                        backgroundColor: '#2a5d7a',
                        borderColor: '#2a5d7a',
                        fontSize: '12px'
                    }}
                >
                    Go to Login
                </Button>
                <Button
                    size="small"
                    block
                    style={{
                        height: '30px',
                        borderRadius: '4px',
                        fontSize: '12px'
                    }}
                >
                    Back to Home
                </Button>
            </Space>
        </div>
    );
};


export default NotificationSuccessfully;