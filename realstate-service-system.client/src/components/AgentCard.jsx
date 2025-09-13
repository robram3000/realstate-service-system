import React from 'react';
import { Card, Avatar, Typography, Rate, Row, Col, Button } from 'antd';

const { Title, Paragraph, Text } = Typography;

const AgentCard = ({ agent }) => {
    return (
        <Card
            style={{
                textAlign: 'center',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                height: '100%'
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
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar size={120} src={agent.image} style={{ border: '4px solid #f0f7ff' }} />
            </div>

            <Title level={4} style={{
                color: '#2a5d7a',
                fontWeight: '600',
                marginBottom: '8px'
            }}>
                {agent.name}
            </Title>

            <Paragraph style={{
                color: '#5a7d99',
                marginBottom: '16px'
            }}>
                {agent.role}
            </Paragraph>

            <div style={{ marginBottom: '20px' }}>
                <Rate
                    disabled
                    defaultValue={agent.rating}
                    style={{ fontSize: '14px', color: '#faad14' }}
                />
                <span style={{ marginLeft: '8px', color: '#5a7d99' }}>{agent.rating}</span>
            </div>

            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={12}>
                    <div style={{
                        color: '#2a5d7a',
                        fontWeight: '600',
                        fontSize: '18px'
                    }}>
                        {agent.experience}
                    </div>
                    <Text style={{ color: '#5a7d99', fontSize: '14px' }}>Experience</Text>
                </Col>
                <Col span={12}>
                    <div style={{
                        color: '#2a5d7a',
                        fontWeight: '600',
                        fontSize: '18px'
                    }}>
                        {agent.properties}+
                    </div>
                    <Text style={{ color: '#5a7d99', fontSize: '14px' }}>Properties</Text>
                </Col>
            </Row>

            <Button
                type="primary"
                ghost
                block
                style={{
                    borderColor: '#2a5d7a',
                    color: '#2a5d7a',
                    fontWeight: '600',
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
        </Card>
    );
};

export default AgentCard;