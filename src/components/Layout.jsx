import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            {/* 
        NavBar is fixed ('fixed="top"'), so it doesn't take up space in the flow.
        We need to add padding to the top of the content so it's not hidden behind the NavBar.
        Height of the NavBar image is 60px + padding. Usually ~80px is safe.
      */}
            <div style={{ flex: 1, paddingTop: '80px', display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
