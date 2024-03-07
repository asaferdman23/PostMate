// App.jsx
// import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import EmailIndex from './pages/EmailIndex';

import AppHeader from './cmps/AppHeader';
import AppFooter from './cmps/AppFooter';

import './assets/css/index.css';
import './assets/css/cmps/app-header.css';
// import Sent from './components/Sent';
// Import other pages/components

function App() {
  return (
    <Router>
     <section className="main-app">
        <AppHeader />
        <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/email" element={<EmailIndex/>} />
            </Routes>
        </main>
          <AppFooter/>  
        </section>
    </Router>
  );
}

export default App;
