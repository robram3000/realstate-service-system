import React from 'react';
import { Card, Tag, Divider, Row, Col, Button } from 'antd';
import {
    EnvironmentOutlined, UserOutlined, HomeOutlined,
    AreaChartOutlined, EyeOutlined, PhoneOutlined,
    MailOutlined, HeartOutlined, HeartFilled
} from '@ant-design/icons';

const { Meta } = Card;

const PropertyCard = ({ property, onFavoriteToggle, onViewDetails }) => {
    return (
        <Card
            hoverable
            style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                border: '1px solid #e8e8e8'
            }}
            cover={
                <div style={{ position: 'relative' }}>
                    <img
                        alt={property.title}
                        src={property.image}
                        style={{
                            height: '220px',
                            width: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                        }}
                    />
                    <Button
                        type="text"
                        shape="circle"
                        icon={property.favorite ? <HeartFilled style={{ color: '#eb2f96' }} /> : <HeartOutlined />}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'all 0.2s ease'
                        }}
                        onClick={() => onFavoriteToggle(property.id)}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#f9f0ff';
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.transform = 'scale(1)';
                        }}
                    />
                    {property.featured && (
                        <Tag color="#2a5d7a" style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            fontWeight: '600',
                            border: 'none',
                            borderRadius: '4px'
                        }}>
                            Featured
                        </Tag>
                    )}
                </div>
            }
            actions={[
                <div key="view" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5a7d99',
                    transition: 'all 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.target.style.color = '#2a5d7a';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#5a7d99';
                    }}
                    onClick={() => onViewDetails(property)}>
                    <EyeOutlined /> View Details
                </div>,
                <div key="call" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5a7d99',
                    transition: 'all 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.target.style.color = '#2a5d7a';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#5a7d99';
                    }}>
                    <PhoneOutlined /> Call
                </div>,
                <div key="email" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5a7d99',
                    transition: 'all 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.target.style.color = '#2a5d7a';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#5a7d99';
                    }}>
                    <MailOutlined /> Email
                </div>
            ]}
        >
            <Meta
                title={<span style={{
                    color: '#2a5d7a',
                    fontSize: '18px',
                    fontWeight: '600'
                }}>{property.title}</span>}
                description={
                    <>
                        <div style={{
                            marginBottom: '12px',
                            color: '#5a7d99',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <EnvironmentOutlined style={{ marginRight: '8px', color: '#2a5d7a' }} />
                            {property.location}
                        </div>
                        <div style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#2a5d7a',
                            marginBottom: '12px'
                        }}>
                            {property.price}
                        </div>
                        <Divider style={{ margin: '12px 0', borderColor: '#f0f0f0' }} />
                        <Row gutter={16}>
                            <Col span={8}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#5a7d99'
                                }}>
                                    <UserOutlined style={{ marginRight: '6px', color: '#2a5d7a' }} />
                                    {property.beds} Beds
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#5a7d99'
                                }}>
                                    <HomeOutlined style={{ marginRight: '6px', color: '#2a5d7a' }} />
                                    {property.baths} Baths
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#5a7d99'
                                }}>
                                    <AreaChartOutlined style={{ marginRight: '6px', color: '#2a5d7a' }} />
                                    {property.sqft} sqft
                                </div>
                            </Col>
                        </Row>
                    </>
                }
            />
        </Card>
    );
};

export default PropertyCard;