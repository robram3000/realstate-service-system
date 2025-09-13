import React from 'react';
import { Card, Typography, Divider, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const BaseFP = ({ children, title, subtitle, onBack, showSteps = false, currentStep = 0 }) => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px'
        }}>
            <Card style={{
                width: '100%',
                maxWidth: 450,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    {onBack && (
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={onBack}
                            style={{ marginRight: 8 }}
                        />
                    )}
                    <div style={{ flex: 1 }}>
                        <Title level={3} style={{ margin: 0 }}>{title}</Title>
                        {subtitle && <Text type="secondary">{subtitle}</Text>}
                    </div>
                </div>

                <Divider />

                {children}
            </Card>
        </div>
    );
};

export default BaseFP;