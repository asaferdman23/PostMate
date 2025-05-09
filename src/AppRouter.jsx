import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import EmailIndex from './pages/EmailIndex';
import EmailDetails from './pages/EmailDetails';
import EmailCompose from './cmps/EmailCompose';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={
                <EmailIndex />
            } />
            <Route path="/:mailStatus" element={<EmailIndex />} />
            <Route path="/:mailStatus/compose" element={<EmailIndex />} />
            <Route path="/:mailStatus/:emailId" element={<EmailIndex />} />
            <Route path="/about-us" element={<AboutUs />} />
        </Routes>
    );
}

export default AppRouter;
