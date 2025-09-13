import React from 'react';
import { Layout, Row, Col, Typography, Button, Divider } from 'antd';
import {
    HomeOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined,
    FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer style={{
            background: '#1a3a4f',
            color: '#e6f7ff',
            padding: '64px 24px 24px'
        }}>
            {/* Main Footer Content */}
            <Row gutter={[48, 32]} justify="space-between" style={{ maxWidth: '1200px', margin: '0 auto 48px' }}>
                {/* Company Info */}
                <Col xs={24} md={8} style={{ padding: '0 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{
                            backgroundColor: '#2a5d7a',
                            borderRadius: '10px',
                            padding: '10px',
                            marginRight: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}>
                            <HomeOutlined style={{ fontSize: '28px', color: '#ffffff' }} />
                        </div>
                        <Title level={3} style={{ color: 'white', margin: 0, fontWeight: '700' }}>BetheLand</Title>
                    </div>
                    <Paragraph style={{ color: '#accadd', lineHeight: '1.6', marginBottom: '24px' }}>
                        Providing exceptional real estate services for over 15 years. We help you find the perfect property for your needs.
                    </Paragraph>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                            type="text"
                            icon={<FacebookOutlined style={{ color: '#accadd', fontSize: '20px' }} />}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#accadd';
                            }}
                        />
                        <Button
                            type="text"
                            icon={<TwitterOutlined style={{ color: '#accadd', fontSize: '20px' }} />}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#accadd';
                            }}
                        />
                        <Button
                            type="text"
                            icon={<InstagramOutlined style={{ color: '#accadd', fontSize: '20px' }} />}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#accadd';
                            }}
                        />
                        <Button
                            type="text"
                            icon={<LinkedinOutlined style={{ color: '#accadd', fontSize: '20px' }} />}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#accadd';
                            }}
                        />
                    </div>
                </Col>

                {/* Quick Links */}
                <Col xs={12} md={5} style={{ padding: '0 16px' }}>
                    <Title level={4} style={{ color: 'white', marginBottom: '24px' }}>Quick Links</Title>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['Home', 'Properties', 'Services', 'Agents', 'About Us'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                style={{
                                    color: '#accadd',
                                    transition: 'color 0.3s ease',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#accadd';
                                }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </Col>

                {/* Support */}
                <Col xs={12} md={5} style={{ padding: '0 16px' }}>
                    <Title level={4} style={{ color: 'white', marginBottom: '24px' }}>Support</Title>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['FAQ', 'Privacy Policy', 'Terms of Service', 'Contact', 'Careers'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                style={{
                                    color: '#accadd',
                                    transition: 'color 0.3s ease',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#accadd';
                                }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </Col>

                {/* Contact Info */}
                <Col xs={24} md={6} style={{ padding: '0 16px' }}>
                    <Title level={4} style={{ color: 'white', marginBottom: '24px' }}>Contact Info</Title>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#accadd' }}>
                            <PhoneOutlined style={{ marginRight: '12px', color: '#4db8ff' }} />
                            <span>0977-849-1888</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#accadd' }}>
                            <MailOutlined style={{ marginRight: '12px', color: '#4db8ff' }} />
                            <span>allanlao@betheland.com.ph</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', color: '#accadd' }}>
                            <EnvironmentOutlined style={{ marginRight: '12px', color: '#4db8ff', marginTop: '4px' }} />
                            <span>E. Jacinto St. Poblacion, Magdalena, Philippines</span>
                        </div>
                    </div>
                </Col>
            </Row>

            <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.15)', maxWidth: '1200px', margin: '0 auto' }} />

            {/* Copyright */}
            <div style={{
                textAlign: 'center',
                paddingTop: '24px',
                color: '#accadd',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                © 2023 BetheLand. All rights reserved. | Professional Real Estate Services
            </div>
        </Footer>
    );
};

export default AppFooter;