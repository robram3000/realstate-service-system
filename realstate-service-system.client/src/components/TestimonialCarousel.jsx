import React from 'react';
import { Carousel, Avatar, Typography, Rate } from 'antd';

const { Title, Paragraph } = Typography;

const TestimonialCarousel = () => {
    const testimonials = [
        {
            name: "John and Sarah Miller",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            content: "\"PrimeRealty helped us find our dream home in just two weeks. Their agents were professional and knowledgeable about the market. The entire process was smooth and stress-free. We couldn't be happier with our new home!\""
        },
        {
            name: "Jennifer Wilson",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            content: "\"As a first-time home buyer, I was nervous about the process. Emily from PrimeRealty guided me through every step and found me the perfect condo within my budget. I highly recommend their services to anyone looking to buy property.\""
        },
        {
            name: "Robert Davis",
            avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            content: "\"I've used PrimeRealty for both buying and selling properties. They always get me the best deals and make the process smooth. Their market knowledge and negotiation skills are exceptional.\""
        }
    ];

    return (
        <Carousel autoplay effect="fade">
            {testimonials.map((testimonial, index) => (
                <div key={index}>
                    <div style={{ padding: '30px', textAlign: 'center' }}>
                        <Avatar size={80} src={testimonial.avatar} />
                        <Title level={4} style={{ marginTop: '20px' }}>{testimonial.name}</Title>
                        <div>
                            <Rate disabled defaultValue={5} style={{ fontSize: '16px', marginBottom: '15px' }} />
                        </div>
                        <Paragraph style={{ fontSize: '16px', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto' }}>
                            {testimonial.content}
                        </Paragraph>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default TestimonialCarousel;