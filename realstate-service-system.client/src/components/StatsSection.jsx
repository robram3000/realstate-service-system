import React from 'react';
import { Row, Col, Statistic, Typography } from 'antd';
import { UserOutlined, HomeOutlined, CalendarOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StatsSection = () => {
    return (
        <div style={{
            marginBottom: '50px',
            background: 'white',
            padding: '60px 40px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
            <Title level={2} style={{
                color: '#2a5d7a',
                fontWeight: '700',
                marginBottom: '40px',
                textAlign: 'center'
            }}>
                Our Achievements
            </Title>

            <Row gutter={[32, 32]} style={{ textAlign: 'center' }}>
                <Col xs={12} sm={8} md={6}>
                    <div style={{
                        padding: '20px',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(42,93,122,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        <Statistic
                            title={<span style={{ color: '#5a7d99', fontSize: '16px' }}>Happy Clients</span>}
                            value={1250}
                            valueStyle={{ color: '#2a5d7a', fontSize: '32px', fontWeight: '700' }}
                            prefix={<UserOutlined style={{ color: '#2a5d7a', marginRight: '8px' }} />}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={8} md={6}>
                    <div style={{
                        padding: '20px',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(42,93,122,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        <Statistic
                            title={<span style={{ color: '#5a7d99', fontSize: '16px' }}>Properties Sold</span>}
                            value={2584}
                            valueStyle={{ color: '#2a5d7a', fontSize: '32px', fontWeight: '700' }}
                            prefix={<HomeOutlined style={{ color: '#2a5d7a', marginRight: '8px' }} />}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={8} md={6}>
                    <div style={{
                        padding: '20px',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(42,93,122,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        <Statistic
                            title={<span style={{ color: '#5a7d99', fontSize: '16px' }}>Years Experience</span>}
                            value={15}
                            valueStyle={{ color: '#2a5d7a', fontSize: '32px', fontWeight: '700' }}
                            prefix={<CalendarOutlined style={{ color: '#2a5d7a', marginRight: '8px' }} />}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={8} md={6}>
                    <div style={{
                        padding: '20px',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(42,93,122,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        <Statistic
                            title={<span style={{ color: '#5a7d99', fontSize: '16px' }}>Awards Won</span>}
                            value={36}
                            valueStyle={{ color: '#2a5d7a', fontSize: '32px', fontWeight: '700' }}
                            prefix={<TrophyOutlined style={{ color: '#2a5d7a', marginRight: '8px' }} />}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default StatsSection;