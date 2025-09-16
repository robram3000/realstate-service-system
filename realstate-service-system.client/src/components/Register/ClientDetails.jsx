import React from 'react';
import { Form, Input, Button, Typography, Space, Row, Col, DatePicker } from 'antd';
import { 
  UserOutlined, 
  PhoneOutlined, 
  IdcardOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

const ClientDetails = ({ onNext, onBack }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onNext(values);
    };

    return (
        <div>
            <Title level={4} style={{ textAlign: 'center', marginBottom: '6px', color: '#1a3a4f', fontSize: '14px' }}>
                Personal Information
            </Title>
            <Divider style={{ margin: '16px 0', borderColor: '#d9d9d9' }} />
            <Text style={{ textAlign: 'center', display: 'block', marginBottom: '20px', color: '#2a5d7a', fontSize: '12px' }}>
                Tell us a bit about yourself
            </Text>

            <Form
                form={form}
                name="clientDetails"
                onFinish={onFinish}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="firstName"
                            label={<span style={{ fontSize: '12px' }}>First Name</span>}
                        >
                            <Input
                                prefix={<UserOutlined style={{ fontSize: '12px' }} />}
                                placeholder="First name"
                                size="small"
                                style={{ height: '30px', fontSize: '12px' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="lastName"
                            label={<span style={{ fontSize: '12px' }}>Last Name</span>}
                        >
                            <Input
                                prefix={<UserOutlined style={{ fontSize: '12px' }} />}
                                placeholder="Last name"
                                size="small"
                                style={{ height: '30px', fontSize: '12px' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="phone"
                    label={<span style={{ fontSize: '12px' }}>Phone Number</span>}
                >
                    <Input
                        prefix={<PhoneOutlined style={{ fontSize: '12px' }} />}
                        placeholder="Phone number"
                        size="small"
                        style={{ height: '30px', fontSize: '12px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="dateOfBirth"
                    label={<span style={{ fontSize: '12px' }}>Date of Birth</span>}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        size="small"
                        style={{ height: '30px', fontSize: '12px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="address"
                    label={<span style={{ fontSize: '12px' }}>Address</span>}
                >
                    <TextArea
                        rows={3}
                        placeholder="Your full address"
                        size="small"
                        style={{ fontSize: '12px' }}
                    />
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
                        Continue
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

export default ClientDetails;