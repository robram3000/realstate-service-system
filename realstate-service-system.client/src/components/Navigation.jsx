import React, { useState } from 'react';
import { Layout, Button, Row, Col, Typography, Divider, Space } from 'antd';
import { HomeOutlined, UserOutlined, PhoneOutlined, MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title, Text } = Typography;

const Navigation = () => {
    const [current, setCurrent] = useState('home');
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

    const menuItems = [
        { key: 'home', label: 'Home' },
        { key: 'properties', label: 'Properties' },
        { key: 'services', label: 'Services' },
        { key: 'agents', label: 'Agents' },
        { key: 'about', label: 'About Us' },
        { key: 'contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Top info bar */}
            <div style={{
                backgroundColor: '#1a3a4f',
                padding: '10px 50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <Space>
                    <Text style={{
                        color: '#c9e9ff',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <PhoneOutlined style={{ marginRight: '8px', color: '#4db8ff' }} />
                        +1 (555) 123-4567
                    </Text>
                    <Text style={{
                        color: '#c9e9ff',
                        fontSize: '14px',
                        fontWeight: 300
                    }}>
                        Opening Hours: Mon-Fri 9am-5pm
                    </Text>
                </Space>
            </div>

            {/* Main navigation */}
            <Header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                padding: '0 50px',
                height: '80px',
                borderBottom: '2px solid #f0f0f0'
            }}>
                {/* Logo section */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        backgroundColor: '#2a5d7a',
                        borderRadius: '10px',
                        padding: '10px',
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(42,93,122,0.3)'
                    }}>
                        <HomeOutlined style={{ fontSize: '28px', color: '#ffffff' }} />
                    </div>
                    <Title level={2} style={{
                        margin: 0,
                        color: '#2a5d7a',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}>BetheLand</Title>
                </div>

                {/* Desktop menu */}
                <div style={{ flex: 1, marginLeft: '40px', display: { xs: 'none', md: 'block' } }}>
                    <Row gutter={30} justify="center">
                        {menuItems.map(item => (
                            <Col key={item.key}>
                                <a
                                    href={`#${item.key}`}
                                    style={{
                                        color: current === item.key ? '#2a5d7a' : '#5a7d99',
                                        fontWeight: current === item.key ? '600' : '400',
                                        fontSize: '16px',
                                        padding: '8px 0',
                                        position: 'relative',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = '#2a5d7a';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (current !== item.key) {
                                            e.target.style.color = '#5a7d99';
                                        }
                                    }}
                                    onClick={() => setCurrent(item.key)}
                                >
                                    {item.label}
                                    {current === item.key && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-5px',
                                            left: '0',
                                            width: '100%',
                                            height: '3px',
                                            backgroundColor: '#2a5d7a',
                                            borderRadius: '3px'
                                        }}></div>
                                    )}
                                </a>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Auth buttons */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        type="primary"
                        ghost
                        style={{
                            marginRight: '15px',
                            borderColor: '#2a5d7a',
                            color: '#2a5d7a',
                            borderRadius: '6px',
                            height: '40px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#f0f7ff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        <UserOutlined style={{ marginRight: '6px' }} /> Login
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: '#2a5d7a',
                            border: 'none',
                            borderRadius: '6px',
                            height: '40px',
                            fontWeight: '500',
                            boxShadow: '0 2px 6px rgba(42,93,122,0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#3a7da9';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#2a5d7a';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Sign Up
                    </Button>

                    {/* Mobile menu button */}
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ color: '#2a5d7a', fontSize: '20px' }} />}
                        style={{
                            display: { xs: 'block', md: 'none' },
                            marginLeft: '15px'
                        }}
                        onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                    />
                </div>
            </Header>

            {/* Mobile menu dropdown */}
            {mobileMenuVisible && (
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    position: 'absolute',
                    top: '124px',
                    left: 0,
                    right: 0,
                    zIndex: 999,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderTop: '1px solid #f0f0f0',
                    borderBottom: '2px solid #f0f0f0'
                }}>
                    <Row gutter={[0, 15]}>
                        {menuItems.map(item => (
                            <Col span={24} key={item.key}>
                                <a
                                    href={`#${item.key}`}
                                    style={{
                                        color: current === item.key ? '#2a5d7a' : '#5a7d99',
                                        fontWeight: current === item.key ? '600' : '400',
                                        fontSize: '16px',
                                        display: 'block',
                                        padding: '12px 0',
                                        transition: 'all 0.2s ease',
                                        borderRadius: '4px',
                                        paddingLeft: '15px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#f0f7ff';
                                        e.target.style.color = '#2a5d7a';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (current !== item.key) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#5a7d99';
                                        }
                                    }}
                                    onClick={() => {
                                        setCurrent(item.key);
                                        setMobileMenuVisible(false);
                                    }}
                                >
                                    {item.label}
                                </a>
                                <Divider style={{ margin: '5px 0', borderColor: '#f0f0f0' }} />
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </>
    );
};

export default Navigation;