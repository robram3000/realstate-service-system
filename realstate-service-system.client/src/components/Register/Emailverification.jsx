import React from 'react';
import { Form, Input, Button, Typography, Space, ConfigProvider, Row, Col, Divider } from 'antd';
import { MailOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const EmailVerification = ({ onNext }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onNext(values.email);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title
                level={4}
                style={{
                    textAlign: 'center',
                    marginBottom: '6px',
                    color: '#1a3a4f',
                    fontWeight: 600,
                    fontSize: '14px'
                }}
            >
                Get Started
            </Title>
            <Divider style={{ margin: '16px 0', borderColor: '#d9d9d9' }} />
            <Text
                style={{
                    textAlign: 'center',
                    display: 'block',
                    marginBottom: '20px',
                    color: '#2a5d7a',
                    fontSize: '12px'
                }}
            >
                Enter your email address to continue
            </Text>

            <Form
                form={form}
                name="emailVerification"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
                style={{ width: '100%' }}
            >
                <Row justify="center">
                    <Col xs={24} sm={18} md={14}>
                        <Form.Item
                            name="email"
                        >
                            <Input
                                prefix={<MailOutlined style={{ color: '#2a5d7a', fontSize: '12px' }} />}
                                placeholder="Email address"
                                size="small"
                                style={{
                                    borderRadius: '4px',
                                    border: '1px solid #d9d9d9',
                                    padding: '4px 8px',
                                    fontSize: '12px',
                                    height: '30px'
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" style={{ marginTop: '16px' }}>
                    <Col xs={24} sm={18} md={14}>
                        <Form.Item style={{ marginBottom: 0 }}>
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
                                Continue
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default EmailVerification;