import React from 'react';
import { Row, Col, Typography } from 'antd';
import AgentCard from './AgentCard';

const { Title, Paragraph } = Typography;

const AgentsSection = ({ agents }) => {
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
                    Our Expert Agents
                </Title>
                <Paragraph style={{
                    fontSize: '18px',
                    maxWidth: '700px',
                    margin: '0 auto',
                    color: '#5a7d99',
                    lineHeight: '1.6'
                }}>
                    Meet our team of experienced real estate professionals dedicated to finding your perfect property
                </Paragraph>
            </div>
            <Row gutter={[32, 32]}>
                {agents.map((agent, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <AgentCard agent={agent} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AgentsSection;