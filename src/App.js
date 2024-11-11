// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './Layout/Layout'; // Importing the Layout component
import Home from './Pages/Home';
import View from './Pages/View';
import Edit from './Pages/Edit';
import Settings from './Pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="profile/view" element={<View />} />
        <Route path="profile/edit" element={<Edit />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>




  );
}

export default App;
