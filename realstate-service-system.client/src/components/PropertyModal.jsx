import React from 'react';
import { Modal, Row, Col, Typography, Divider, Button, Space } from 'antd';
import {
    EnvironmentOutlined, UserOutlined, HomeOutlined,
    AreaChartOutlined, CalendarOutlined, CloseOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const PropertyModal = ({ visible, property, onClose }) => {
    if (!property) return null;

    return (
        <Modal
            title={null}
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={1000}
            closeIcon={<CloseOutlined style={{ color: '#2a5d7a', fontSize: '18px' }} />}
            style={{ borderRadius: '12px' }}
            bodyStyle={{ padding: '0' }}
        >
            {/* Custom header */}
            <div style={{
                padding: '20px 24px',
                backgroundColor: '#f8fbff',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <Title level={3} style={{
                    margin: 0,
                    color: '#2a5d7a',
                    fontWeight: '600',
                    textAlign: 'center'
                }}>
                    {property.title}
                </Title>
            </div>

            <Row gutter={0}>
                <Col span={12}>
                    <img
                        src={property.image}
                        alt={property.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div style={{ padding: '24px' }}>
                        <Title level={2} style={{
                            color: '#2a5d7a',
                            marginBottom: '8px',
                            fontWeight: '700'
                        }}>
                            {property.price}
                        </Title>

                        <Paragraph style={{
                            marginBottom: '20px',
                            color: '#5a7d99',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <EnvironmentOutlined style={{
                                marginRight: '8px',
                                color: '#2a5d7a'
                            }} />
                            {property.location}
                        </Paragraph>

                        <Divider style={{
                            margin: '16px 0',
                            borderColor: '#f0f0f0'
                        }} />

                        <Row gutter={16} style={{ marginBottom: '24px' }}>
                            <Col span={8}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#5a7d99'
                                }}>
                                    <UserOutlined style={{
                                        marginRight: '6px',
                                        color: '#2a5d7a'
                                    }} />
                                    {property.beds} Beds
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#5a7d99'
                                }}>
                                    <HomeOutlined style={{
                                        marginRight: '6px',
                                        color: '#2a5d7a'
                                    }} />
                                    {property.baths} Baths
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#5a7d99'
                                }}>
                                    <AreaChartOutlined style={{
                                        marginRight: '6px',
                                        color: '#2a5d7a'
                                    }} />
                                    {property.sqft} sqft
                                </div>
                            </Col>
                        </Row>

                        <Paragraph style={{
                            color: '#5a7d99',
                            lineHeight: '1.6',
                            marginBottom: '20px'
                        }}>
                            {property.description}
                        </Paragraph>

                        <Paragraph style={{
                            color: '#5a7d99',
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '24px'
                        }}>
                            <CalendarOutlined style={{
                                marginRight: '8px',
                                color: '#2a5d7a'
                            }} />
                            Year Built: {property.year}
                        </Paragraph>

                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                size="large"
                                style={{
                                    backgroundColor: '#2a5d7a',
                                    border: 'none',
                                    height: '48px',
                                    fontWeight: '600',
                                    width: '100%',
                                    borderRadius: '6px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#3a7da9';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#2a5d7a';
                                }}
                            >
                                Schedule a Viewing
                            </Button>

                            <Button
                                size="large"
                                style={{
                                    color: '#2a5d7a',
                                    borderColor: '#2a5d7a',
                                    height: '48px',
                                    fontWeight: '500',
                                    width: '100%',
                                    borderRadius: '6px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f0f7ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                }}
                            >
                                Contact Agent
                            </Button>
                        </Space>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default PropertyModal;