import React, { useState } from 'react';
import { Form, Input, Button, Card, Divider, message, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Replace with actual authentication logic
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

    const handleGoogleLogin = () => {
        setLoading(true);
        message.info('Redirecting to Google login...');
        // Simulate redirect
        setTimeout(() => setLoading(false), 1500);
    };

    const handleGitHubLogin = () => {
        setLoading(true);
        message.info('Redirecting to GitHub login...');
        // Simulate redirect
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="login-header">
                    <Title level={2}>Welcome Back</Title>
                    <Text type="secondary">Sign in to your account to continue</Text>
                </div>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    className="login-form"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter your username"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter your password"
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
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <Divider plain>Or continue with</Divider>

                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <Button
                        icon={<GoogleOutlined />}
                        size="large"
                        block
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="social-btn google-btn"
                    >
                        Sign in with Google
                    </Button>

                    <Button
                        icon={<GithubOutlined />}
                        size="large"
                        block
                        onClick={handleGitHubLogin}
                        disabled={loading}
                        className="social-btn github-btn"
                    >
                        Sign in with GitHub
                    </Button>
                </Space>

                <div className="login-footer">
                    <Text type="secondary">
                        Don't have an account? <a href="#signup">Sign up</a>
                    </Text>
                    <br />
                    <Text type="secondary">
                        Forgot your password? <a href="#reset">Reset it</a>
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default Login;