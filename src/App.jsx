import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacts from './Contacts';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/contact/:id" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
