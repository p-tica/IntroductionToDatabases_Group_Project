// Citation for starter code
// Date: 06/09/2025
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

// Components
import Navigation from './components/Navigation';

// Define the backend URL for API requests from environment variable
const backendURL = import.meta.env.VITE_API_URL || '/api';  // Fallback to /api for nginx setup

function App() {

    return (
        <>
            <Navigation backendURL={backendURL} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<Artists backendURL={backendURL} />} />
                <Route path="/managers" element={<Managers backendURL={backendURL} />} />
                <Route path="/rooms" element={<Rooms backendURL={backendURL} />} />
                <Route path="/invoices" element={<Invoices backendURL={backendURL} />} />
                <Route path="/recording_sessions" element={<Recording_Sessions backendURL={backendURL} />} />
                <Route path="/recording_sessions_has_artists" element={<Recording_Sessions_has_Artists backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;