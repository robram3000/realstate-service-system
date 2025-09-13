import React, { useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import FeaturedProperties from './FeaturedProperties';
import ServicesSection from './ServicesSection';
import AgentsSection from './AgentsSection';
import TestimonialsSection from './TestimonialsSection';
import PropertyModal from './PropertyModal';
import {
    DollarOutlined,
    HomeOutlined,
    AreaChartOutlined,
    CheckCircleOutlined,
    TeamOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const SectionLandingPage = () => {
    const [visible, setVisible] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const properties = [
        {
            id: 1,
            title: 'Luxury Waterfront Villa',
            description: 'Stunning 5 bedroom villa with private pool, panoramic ocean views, and modern amenities',
            price: '₱65,000,000',
            image: 'https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/545603893_122270549804228946_4357983153490984250_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=FuMwRuuRFkgQ7kNvwHxswrJ&_nc_oc=AdnwoWjOnHzwwtPozv8YxjA5qBpdISu0lQdH_7yzUnEXXq0awMNmWYgzap8-2xh_zzA&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=0TiykcrxY04wJ-0mvdK69w&oh=00_AfZIm7njoEmH_VP115QmuNeCoa6UXiCyfWrBjEPzxdgVlQ&oe=68C72F18',
            location: 'Mactan, Cebu',
            beds: 5,
            baths: 4,
            sqft: 4200,
            year: 2019,
            featured: true,
            favorite: false
        },
        {
            id: 2,
            title: 'Modern Condominium',
            description: 'Spacious 3 bedroom apartment in the heart of the city with concierge service',
            price: '₱32,500,000',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Bonifacio Global City, Taguig',
            beds: 3,
            baths: 2,
            sqft: 1800,
            year: 2021,
            featured: true,
            favorite: false
        },
        {
            id: 3,
            title: 'Country Estate Home',
            description: 'Charming country house with large land, perfect for families seeking tranquility',
            price: '₱42,500,000',
            image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Tagaytay, Cavite',
            beds: 4,
            baths: 3,
            sqft: 3200,
            year: 2015,
            featured: false,
            favorite: false
        },
        {
            id: 4,
            title: 'Beachfront Paradise',
            description: 'Stunning beach house with direct ocean access and breathtaking sunset views',
            price: '₱87,500,000',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Panglao, Bohol',
            beds: 4,
            baths: 4.5,
            sqft: 3800,
            year: 2020,
            featured: true,
            favorite: false
        },
        {
            id: 5,
            title: 'Urban Loft',
            description: 'Converted industrial loft with high ceilings and exposed brick in trendy neighborhood',
            price: '₱36,250,000',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Poblacion, Makati',
            beds: 2,
            baths: 2,
            sqft: 2200,
            year: 2018,
            featured: false,
            favorite: false
        },
        {
            id: 6,
            title: 'Mountain Retreat',
            description: 'Luxury cabin with stunning mountain views and premium outdoor living spaces',
            price: '₱55,000,000',
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            location: 'Baguio, Benguet',
            beds: 5,
            baths: 3,
            sqft: 3800,
            year: 2017,
            featured: true,
            favorite: false
        }
    ];

    const services = [
        {
            title: 'Property Sales & Acquisition',
            description: 'Full-service buying and selling with expert negotiation and market analysis.',
            icon: <DollarOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        },
        {
            title: 'Property Management',
            description: 'Comprehensive management services for rental properties, including tenant screening and maintenance.',
            icon: <HomeOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        },
        {
            title: 'Real Estate Investment Consulting',
            description: 'Strategic advice for building wealth through real estate investments and portfolio management.',
            icon: <AreaChartOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        },
        {
            title: 'Home Staging & Preparation',
            description: 'Professional staging services to maximize your property appeal and sale price.',
            icon: <CheckCircleOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        },
        {
            title: 'Mortgage & Financing Assistance',
            description: 'Guidance through the financing process with our network of trusted lending partners.',
            icon: <TeamOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        },
        {
            title: 'Legal & Closing Services',
            description: 'Seamless closing process with experienced real estate attorneys and title services.',
            icon: <TrophyOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        }
    ];

    const agents = [
        {
            name: 'Michael Santos',
            role: 'Senior Real Estate Agent',
            experience: '12 years',
            properties: 247,
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            rating: 4.9
        },
        {
            name: 'Sarah Reyes',
            role: 'Luxury Home Specialist',
            experience: '8 years',
            properties: 182,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            rating: 4.8
        },
        {
            name: 'Robert Cruz',
            role: 'Commercial Real Estate',
            experience: '15 years',
            properties: 321,
            image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            rating: 4.7
        },
        {
            name: 'Emily Tan',
            role: 'First-Time Home Buyer Specialist',
            experience: '6 years',
            properties: 134,
            image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e946?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            rating: 4.9
        }
    ];

    const toggleFavorite = (id) => {
        // In a real app, you would update state here
        console.log(`Property ${id} favorite status toggled`);
    };

    const showPropertyModal = (property) => {
        setSelectedProperty(property);
        setVisible(true);
    };

    const handleModalClose = () => {
        setVisible(false);
        setSelectedProperty(null);
    };

    return (
        <Content style={{ padding: '0 50px', background: '#f5f7fa' }}>
            <HeroSection />
            <StatsSection />
            <FeaturedProperties
                properties={properties}
                onFavoriteToggle={toggleFavorite}
                onViewDetails={showPropertyModal}
            />
            <ServicesSection services={services} />
            <AgentsSection agents={agents} />
            <TestimonialsSection />
            <PropertyModal
                visible={visible}
                property={selectedProperty}
                onClose={handleModalClose}
            />
        </Content>
    );
};

export default SectionLandingPage;