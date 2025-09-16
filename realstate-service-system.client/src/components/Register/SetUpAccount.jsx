import React from 'react';
import { Form, Input, Button, Typography, Space, Checkbox, Alert } from 'antd';
import { 
  LockOutlined, 
  ArrowLeftOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Password } = Input;

const SetUpAccount = ({ onNext, onBack }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onNext(values);
    };

    return (
        <div>
            <Title level={4} style={{ textAlign: 'center', marginBottom: '6px', color: '#1a3a4f', fontSize: '14px' }}>
                Create Account
            </Title>
            <Divider style={{ margin: '16px 0', borderColor: '#d9d9d9' }} />
            <Text style={{ textAlign: 'center', display: 'block', marginBottom: '20px', color: '#2a5d7a', fontSize: '12px' }}>
                Set up your login credentials
            </Text>

            <Alert
                message="Security tips"
                description="Choose a strong password that you don't use elsewhere."
                type="info"
                showIcon
                style={{ marginBottom: '20px', fontSize: '12px' }}
            />

            <Form
                form={form}
                name="setUpAccount"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label={<span style={{ fontSize: '12px' }}>Username</span>}
                >
                    <Input
                        placeholder="Username"
                        size="small"
                        style={{ height: '30px', fontSize: '12px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={<span style={{ fontSize: '12px' }}>Password</span>}
                >
                    <Password
                        prefix={<LockOutlined style={{ fontSize: '12px' }} />}
                        placeholder="Password"
                        size="small"
                        style={{ height: '30px', fontSize: '12px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label={<span style={{ fontSize: '12px' }}>Confirm Password</span>}
                >
                    <Password
                        prefix={<LockOutlined style={{ fontSize: '12px' }} />}
                        placeholder="Confirm password"
                        size="small"
                        style={{ height: '30px', fontSize: '12px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                >
                    <Checkbox style={{ fontSize: '12px' }}>
                        I have read and agree to the <a href="#" style={{ fontSize: '12px' }}>Terms of Service</a> and <a href="#" style={{ fontSize: '12px' }}>Privacy Policy</a>
                    </Checkbox>
                </Form.Item>

                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="small"
                        block
                        icon={<ArrowRightOutlined style={{ fontSize: '12px' }} />}
                        style={{
                            height: '30px',
                            borderRadius: '4px',
                            fontWeight: 500,
                            backgroundColor: '#2a5d7a',
                            borderColor: '#2a5d7a',
                            fontSize: '12px'
                        }}
                    >
                        Create Account
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
        </div>
    );
};

export default SetUpAccount;