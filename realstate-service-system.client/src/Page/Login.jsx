import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [typingText, setTypingText] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);
    const [typingComplete, setTypingComplete] = useState(false);
    const navigate = useNavigate();

    const fullText = "Providing exceptional real estate services for over 15 years. We help you find the perfect property for your needs.";

    useEffect(() => {
        if (typingIndex < fullText.length) {
            const timer = setTimeout(() => {
                setTypingText(prevText => prevText + fullText.charAt(typingIndex));
                setTypingIndex(prevIndex => prevIndex + 1);
            }, 40);

            return () => clearTimeout(timer);
        } else {
            setTypingComplete(true);
        }
    }, [typingIndex, fullText]);

    const onFinish = async (values) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (values.username === 'demo' && values.password === 'password') {
                message.success('Login successful!');
            } else {
                message.error('Invalid username or password');
            }
        } catch (error) {
            message.error('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#f0f2f5'
        }}>
            {/* Left side with background image */}
            <div style={{
                flex: 1,
                backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                display: window.innerWidth > 768 ? 'flex' : 'none'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(26, 58, 79, 0.85) 0%, rgba(42, 93, 122, 0.85) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                    textAlign: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{
                            backgroundColor: '#2a5d7a',
                            borderRadius: '10px',
                            padding: '10px',
                            marginRight: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}>
                            <HomeOutlined style={{ fontSize: '28px', color: '#ffffff' }} />
                        </div>
                        <Title level={1} style={{ color: 'white', margin: 0, fontWeight: '700' }}>BetheLand</Title>
                    </div>
                    <Text style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1.2rem',
                        maxWidth: '500px',
                        minHeight: '60px',
                        display: 'block',
                        lineHeight: '1.5'
                    }}>
                        {typingText}
                        {!typingComplete && <span style={{
                            animation: 'blink 1s infinite',
                            marginLeft: '2px',
                            borderRight: '2px solid rgba(255, 255, 255, 0.9)'
                        }}></span>}
                    </Text>
                    <style>
                        {`
                        @keyframes blink {
                            0% { opacity: 1; }
                            50% { opacity: 0; }
                            100% { opacity: 1; }
                        }
                        `}
                    </style>
                </div>
            </div>

            {/* Right side with login form */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                background: window.innerWidth > 768 ? 'transparent' : 'linear-gradient(135deg, rgba(26, 58, 79, 0.1) 0%, rgba(42, 93, 122, 0.1) 100%)'
            }}>
                <Card
                    style={{
                        width: '100%',
                        maxWidth: '440px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: 'none',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)'
                    }}
                    bodyStyle={{ padding: '40px' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <Title level={2} style={{ marginBottom: '8px', color: '#1a3a4f' }}>Welcome Back</Title>
                        <Divider style={{ margin: '16px 0' }} />
                        <Text type="secondary" style={{ fontSize: '15px' }}>Sign in to your account to continue</Text>
                    </div>

                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            style={{ marginBottom: '22px' }}
                        >
                            <Input
                                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                                placeholder="Enter your username"
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '6px',
                                    border: '1px solid #d9d9d9'
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            style={{ marginBottom: '24px' }}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                                placeholder="Enter your password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '6px',
                                    border: '1px solid #d9d9d9'
                                }}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '16px' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                size="large"
                                style={{
                                    height: '46px',
                                    fontWeight: '600',
                                    borderRadius: '6px',
                                    background: 'linear-gradient(135deg, #1a3a4f 0%, #2a5d7a 100%)',
                                    border: 'none',
                                    fontSize: '16px'
                                }}
                            >
                                Sign In
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                            <a
                                href="#forgot"
                                style={{ fontSize: '14px', color: '#1a3a4f' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleForgotPassword();
                                }}
                            >
                                Forgot your password?
                            </a>
                        </div>

                        <Divider style={{ margin: '16px 0' }} />
                    </Form>

                    <div style={{ textAlign: 'center', marginTop: '32px' }}>
                        <Text type="secondary" style={{ fontSize: '14px' }}>
                            Don't have an account?{' '}
                            <a
                                href="#signup"
                                style={{ fontWeight: '500', color: '#1a3a4f' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRegister();
                                }}
                            >
                                Sign up
                            </a>
                        </Text>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;