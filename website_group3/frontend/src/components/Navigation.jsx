// Citation for starter code
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import ResetButton from "./ResetButton";

function Navigation({ backendURL }) {
    return (
        <nav>
            <a href="/">Home</a>
            <a href="/recording_sessions">Recording Sessions</a>
            <a href="/artists">Artists</a>
            <a href="/recording_sessions_has_artists">Recording Sessions and Artists</a>
            <a href="/managers">Managers</a>
            <a href="/invoices">Invoices</a>
            <a href="/rooms">Rooms</a>
            <ResetButton backendURL={backendURL}/>
        </nav>
    )
} export default Navigation;