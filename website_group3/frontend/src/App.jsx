import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Artists from './pages/Artists';
import Managers from './pages/Managers';
import Rooms from './pages/Rooms';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 60000;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<Artists backendURL={backendURL} />} />
                <Route path="/managers" element={<Managers backendURL={backendURL} />} />
                <Route path="/rooms" element={<Rooms backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;