import React from 'react';
import { Tabs, Row, Col, Select, Input, Button, Typography } from 'antd';
import { SearchOutlined, PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const HeroSection = () => {
    return (
        <div style={{
            background: 'linear-gradient(rgba(74, 85, 104, 0.8), rgba(74, 85, 104, 0.7)), url(https://scontent.fmnl17-1.fna.fbcdn.net/v/t39.30808-6/545201568_122270549660228946_437470749526074636_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=31fpE8Bc7lgQ7kNvwHraQdN&_nc_oc=Adme19nibm6cA4SZksHrQQ7pvSl0odytTcHTGhi-BAYbBZUACrnNMzfrLbx_w3DzwJw&_nc_zt=23&_nc_ht=scontent.fmnl17-1.fna&_nc_gid=zJl170EAjNFWseAgHooPuA&oh=00_AfaDiH3mDMZFC5x-xuGWt9x4jQOdeAT3XADYGH7I8_kTDg&oe=68C74AF5)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            marginBottom: '50px',
            borderRadius: '12px',
            marginTop: '20px',
            padding: '40px 20px'
        }}>
            <Title level={1} style={{
                color: 'white',
                fontSize: '2.8rem',
                fontWeight: '700',
                marginBottom: '16px',
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
            }}>
                Find Your Dream Home
            </Title>
            <Paragraph style={{
                fontSize: '1.25rem',
                maxWidth: '700px',
                marginBottom: '40px',
                color: '#f7fafc',
                fontWeight: '300',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
                Discover the perfect property from our curated collection of luxury homes and apartments
            </Paragraph>

            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '30px',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '900px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
                <Tabs defaultActiveKey="buy">
                    <TabPane tab={<span style={{ color: '#2a5d7a', fontWeight: '500' }}>Buy</span>} key="buy">
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={8}>
                                <Select
                                    defaultValue="all"
                                    style={{ width: '100%' }}
                                    size="large"
                                >
                                    <Option value="all">All Property Types</Option>
                                    <Option value="house">Houses</Option>
                                    <Option value="apartment">Apartments</Option>
                                    <Option value="commercial">Commercial</Option>
                                </Select>
                            </Col>
                            <Col xs={24} md={8}>
                                <Select
                                    defaultValue="any"
                                    style={{ width: '100%' }}
                                    size="large"
                                >
                                    <Option value="any">Any Location</Option>
                                    <Option value="ny">New York</Option>
                                    <Option value="la">Los Angeles</Option>
                                    <Option value="sf">San Francisco</Option>
                                    <Option value="mi">Miami</Option>
                                </Select>
                            </Col>
                            <Col xs={24} md={8}>
                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    icon={<SearchOutlined />}
                                    style={{
                                        backgroundColor: '#2a5d7a',
                                        border: 'none',
                                        borderRadius: '6px',
                                        height: '40px',
                                        fontWeight: '600'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#3a7da9';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#2a5d7a';
                                    }}
                                >
                                    Search Properties
                                </Button>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span style={{ color: '#2a5d7a', fontWeight: '500' }}>Rent</span>} key="rent">
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={8}>
                                <Input
                                    placeholder="Enter Location"
                                    size="large"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Col>
                            <Col xs={24} md={5}>
                                <Input
                                    type="number"
                                    placeholder="Min Price"
                                    size="large"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Col>
                            <Col xs={24} md={5}>
                                <Input
                                    type="number"
                                    placeholder="Max Price"
                                    size="large"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Col>
                            <Col xs={24} md={6}>
                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    icon={<SearchOutlined />}
                                    style={{
                                        backgroundColor: '#2a5d7a',
                                        border: 'none',
                                        borderRadius: '6px',
                                        height: '40px',
                                        fontWeight: '600'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#3a7da9';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#2a5d7a';
                                    }}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>

            <div style={{
                marginTop: '30px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '15px'
            }}>
                <Button
                    type="primary"
                    size="large"
                    ghost
                    icon={<PlayCircleOutlined />}
                    style={{
                        borderColor: 'white',
                        color: 'white',
                        borderRadius: '6px',
                        fontWeight: '500',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                    }}
                >
                    Watch Video
                </Button>
                <Button
                    size="large"
                    style={{
                        color: 'white',
                        borderColor: 'white',
                        borderRadius: '6px',
                        fontWeight: '500',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}
                    icon={<DownloadOutlined />}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                    }}
                >
                    Download Brochure
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;