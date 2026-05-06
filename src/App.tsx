import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Webinar from './pages/Webinar';
import WebinarGrowth from './pages/WebinarGrowth';
import WebinarB2B from './pages/WebinarB2B';
import Resources from './pages/Resources';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/webinar/growth-cho-b2b-startup" element={<WebinarGrowth />} />
        <Route path="/webinar/xay-dung-co-may-tang-truong-b2b" element={<WebinarB2B />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}
