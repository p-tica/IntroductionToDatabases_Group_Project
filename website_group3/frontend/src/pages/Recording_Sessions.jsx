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
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {recording_sessions.map((recording_sessions, index) => (
                            <TableRowRecordingSessions key={index} rowObject={recording_sessions} backendURL={backendURL} refreshRecordingSessions={getData}/>
                        ))}
    
                    </tbody>
                </table>
                
                <AddRecordingSessionsForm recording_sessions={recording_sessions} rooms={rooms} backendURL={backendURL} refreshRecordingSessions={getData} />              
            </>
    );

} export default Recording_Sessions;