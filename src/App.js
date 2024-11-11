// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './Layout/Layout'; // Importing the Layout component

// Sample Components for the pages
const Home = () => <h1>Home Page</h1>;
const Profile = () => <h1>Profile Page</h1>;
const Settings = () => <h1>Settings Page</h1>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
