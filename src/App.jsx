// App.jsx
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './cmps/NavBar';
// import Inbox from './components/Inbox';
// import Sent from './components/Sent';
// Import other pages/components

function App() {
  return (
    <Router>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', minHeight: '100vh' }}>
        <nav>
          {/* Navigation Links or Icons */}
          <NavBar />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/sent" element={<Sent />} />
            <Route path="/star" element={<Star />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
