// Citation for starter code
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowRecordingSessions from '../components/Recording_Sessions/TableRowRecordingSessions';
import AddRecordingSessionsForm from '../components/Recording_Sessions/AddRecordingSessionForm';

function Recording_Sessions({ backendURL }) {

    const [recording_sessions, setRecordingSessions] = useState([]);
    const [rooms, setRooms] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/recording_sessions');
            
            // Convert the response into JSON format
            const {recording_sessions, rooms} = await response.json();
    
            // Update the managers state with the response data
            setRecordingSessions(recording_sessions);
            setRooms(rooms);
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
            <>
                <h1>Recording Sessions</h1>
    
                <table>
                    <thead>
                        <tr>
                            {recording_sessions.length > 0 && Object.keys(recording_sessions[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
    
                    <tbody>
                        {recording_sessions.map((recording_sessions, index) => (
                            <TableRowRecordingSessions key={index} rowObject={recording_sessions} backendURL={backendURL} refreshRecordingSessions={getData}/>
                        ))}
    
                    </tbody>
                </table>
                
                <AddRecordingSessionsForm rooms={rooms} backendURL={backendURL} refreshRecordingSessions={getData} />              
            </>
    );

} export default Recording_Sessions;