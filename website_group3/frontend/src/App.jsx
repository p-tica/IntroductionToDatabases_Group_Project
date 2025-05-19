// Citation for starter code
// Date: 05/08/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Artists from './pages/Artists';
import Managers from './pages/Managers';
import Rooms from './pages/Rooms';
import Invoices from './pages/Invoices';
import Recording_Sessions from './pages/Recording_Sessions';
import Recording_Sessions_has_Artists from './pages/Recording_Sessions_has_Artists';
import Reset from './pages/Reset';

// Components
import Navigation from './components/Navigation';
import ResetButton from './components/ResetButton';

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
                <Route path="/invoices" element={<Invoices backendURL={backendURL} />} />
                <Route path="/recording_sessions" element={<Recording_Sessions backendURL={backendURL} />} />
                <Route path="/recording_sessions_has_artists" element={<Recording_Sessions_has_Artists backendURL={backendURL} />} />
                <Route path="reset" element={<ResetButton backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;