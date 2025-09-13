import React from 'react';
import { Row, Col, Typography } from 'antd';
import ServiceCard from './ServiceCard';

const { Title, Paragraph } = Typography;

const ServicesSection = ({ services }) => {
    return (
        <div style={{
            marginBottom: '50px',
            background: 'white',
            padding: '60px 40px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <Title level={2} style={{
                    color: '#2a5d7a',
                    fontWeight: '700',
                    marginBottom: '16px'
                }}>
                    Our Services
                </Title>
                <Paragraph style={{
                    fontSize: '18px',
                    maxWidth: '700px',
                    margin: '0 auto',
                    color: '#5a7d99',
                    lineHeight: '1.6'
                }}>
                    We offer a comprehensive range of real estate services to meet all your property needs
                </Paragraph>
            </div>
            <Row gutter={[32, 32]}>
                {services.map((service, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                        <ServiceCard service={service} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ServicesSection;