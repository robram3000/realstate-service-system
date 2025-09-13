import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import PropertyCard from './PropertyCard';

const { Title } = Typography;

const FeaturedProperties = ({ properties, onFavoriteToggle, onViewDetails }) => {
    return (
        <div style={{ marginBottom: '50px', padding: '0 20px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <Title level={2} style={{
                    color: '#2a5d7a',
                    fontWeight: '700',
                    margin: 0
                }}>
                    Featured Properties
                </Title>
                <Button
                    type="link"
                    style={{
                        color: '#2a5d7a',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
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
                    View All Properties <ArrowRightOutlined style={{ marginLeft: '6px' }} />
                </Button>
            </div>
            <Row gutter={[24, 24]}>
                {properties.filter(p => p.featured).map((property) => (
                    <Col xs={24} sm={12} lg={8} key={property.id}>
                        <PropertyCard
                            property={property}
                            onFavoriteToggle={onFavoriteToggle}
                            onViewDetails={onViewDetails}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default FeaturedProperties;