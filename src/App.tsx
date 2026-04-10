import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Webinar from './pages/Webinar';
import WebinarB2B from './pages/WebinarB2B';
import Resources from './pages/Resources';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/webinar/xay-dung-co-may-tang-truong-b2b" element={<WebinarB2B />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}
