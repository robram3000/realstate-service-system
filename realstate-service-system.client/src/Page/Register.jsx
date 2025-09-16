import React, { useState } from 'react';
import { Steps, Card, Row, Col, Typography, theme, ConfigProvider } from 'antd';
import {
  EmailVerification,
  Verification,
  ClientDetails,
  SetUpAccount,
  NotificationSuccessfully
} from './../components/Register/index';

const { Title, Text } = Typography;
const { Step } = Steps;
const RegisterPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState('');
    const [formData, setFormData] = useState({});

    const steps = [
        {
            title: 'Email',
            content: <EmailVerification onNext={handleEmailSubmit} />,
        },
        {
            title: 'Verify',
            content: <Verification email={email} onNext={handleVerificationComplete} onBack={() => setCurrentStep(0)} />,
        },
        {
            title: 'Details',
            content: <ClientDetails onNext={handleClientDetailsSubmit} onBack={() => setCurrentStep(1)} />,
        },
        {
            title: 'Account',
            content: <SetUpAccount onNext={handleAccountSetup} onBack={() => setCurrentStep(2)} />,
        },
        {
            title: 'Complete',
            content: <NotificationSuccessfully />,
        },
    ];

    function handleEmailSubmit(email) {
        setEmail(email);
        setCurrentStep(1);
    }

    function handleVerificationComplete() {
        setCurrentStep(2);
    }

    function handleClientDetailsSubmit(data) {
        setFormData({ ...formData, ...data });
        setCurrentStep(3);
    }

    function handleAccountSetup(data) {
        setFormData({ ...formData, ...data });
        setCurrentStep(4);
    }

    const contentStyle = {
        minHeight: '300px',
        padding: '16px',
        marginTop: '16px',
        borderRadius: '4px',
    };

    return (
        <ConfigProvider theme={customTheme}>
            <div style={{
                minHeight: '100vh',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa'
            }}>
                <Row justify="center" align="middle" style={{ width: '100%' }}>
                    <Col xs={24} sm={22} md={20} lg={16} xl={14}>
                        <Card
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                border: 'none'
                            }}
                            bodyStyle={{ padding: '24px' }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                <Title level={4} style={{
                                    color: '#2a5d7a',
                                    marginBottom: '8px',
                                    fontWeight: 600,
                                    fontSize: '16px'
                                }}>
                                    Create Your Account
                                </Title>
                                <Text style={{
                                    color: '#1a3a4f',
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    opacity: 0.8
                                }}>
                                    Follow these simple steps to get started with our platform
                                </Text>
                            </div>

                            <Steps
                                current={currentStep}
                                style={{
                                    marginBottom: '24px',
                                    padding: '0 16px'
                                }}
                                size="small"
                            >
                                {steps.map((step, index) => (
                                    <Step
                                        key={index}
                                        title={
                                            <span style={{
                                                color: currentStep >= index ? '#2a5d7a' : '#8c8c8c',
                                                fontWeight: 500,
                                                fontSize: '12px'
                                            }}>
                                                {step.title}
                                            </span>
                                        }
                                    />
                                ))}
                            </Steps>

                            <div style={contentStyle}>
                                {steps[currentStep].content}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </ConfigProvider>
    );
};

export default RegisterPage;