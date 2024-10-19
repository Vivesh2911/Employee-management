import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Users';
import './App.css'
import EditUser from './components/EditUser'; // Import the EditUser component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/edit-user/:id" element={<EditUser />} /> {/* New edit route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
