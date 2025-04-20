import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './AppRouter';
import AppHeader from './cmps/AppHeader';
import AppFooter from './cmps/AppFooter';
import NavBar from './cmps/NavBar';

import './assets/css/index.css';

function App() {
  return (
    <Router>
      <section className="main-app">
        <main className="container">
          <AppRouter />
        </main>
        {/* <AppFooter /> */}
      </section>
    </Router>
  );
}

export default App;