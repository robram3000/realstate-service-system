import React from 'react';
import { Layout } from 'antd';
import { Navigation , SectionLandingPage , AppFooter} from './../src/components/index';


const BaseLandingPage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navigation />
            <SectionLandingPage />
            <AppFooter />
        </Layout>
    );
};

export default BaseLandingPage;