import React from 'react';
import { Card, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ServiceCard = ({ service }) => {
    return (
        <Card
            style={{
                textAlign: 'center',
                height: '100%',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
            }}
            bodyStyle={{ padding: '24px' }}
            hoverable
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
        >
            <div style={{
                marginBottom: '20px',
                color: '#2a5d7a',
                fontSize: '48px'
            }}>
                {service.icon}
            </div>
            <Title level={4} style={{
                color: '#2a5d7a',
                fontWeight: '600',
                marginBottom: '16px'
            }}>
                {service.title}
            </Title>
            <Paragraph style={{
                color: '#5a7d99',
                lineHeight: '1.6',
                marginBottom: '20px'
            }}>
                {service.description}
            </Paragraph>
            <Button
                type="link"
                style={{
                    color: '#2a5d7a',
                    fontWeight: '600',
                    padding: '0',
                    height: 'auto'
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = '#3a7da9';
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = '#2a5d7a';
                }}
            >
                Learn More <ArrowRightOutlined style={{ marginLeft: '6px' }} />
            </Button>
        </Card>
    );
};

export default ServiceCard;