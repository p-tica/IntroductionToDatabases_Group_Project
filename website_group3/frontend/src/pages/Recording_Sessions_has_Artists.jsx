import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowRecordingSessionshasArtists from '../components/Recording_Sessions_has_Artists/TableRowRecordingSessionshasArtists';
import AddRecordingSessionshasArtistsForm from '../components/Recording_Sessions_has_Artists/AddRecordingSessionshasArtistsForm';
import UpdateRecordingSessionshasArtistsForm from '../components/Recording_Sessions_has_Artists/UpdateRecordingSessionshasArtistsForm';

function Recording_Sessions_has_Artists({ backendURL }) {

    const [recording_sessions_has_artists, setRecordingSessionshasArtists] = useState([]);
    const [recording_sessions, setRecordingSessions] = useState([]);
    const [artists, setArtists] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/recording_sessions_has_artists');
            
            // Convert the response into JSON format
            const {recording_sessions_has_artists, recording_sessions, artists} = await response.json();
    
            // Update the managers state with the response data
            setRecordingSessionshasArtists(recording_sessions_has_artists);
            setRecordingSessions(recording_sessions);
            setArtists(artists);
            
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
                    <h1>Recording Sessions and Artists</h1>
        
                    <table>
                        <thead>
                            <tr>
                                {recording_sessions_has_artists.length > 0 && Object.keys(recording_sessions_has_artists[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
        
                        <tbody>
                            {recording_sessions_has_artists.map((recording_sessions_has_artists, index) => (
                                <TableRowRecordingSessionshasArtists key={index} rowObject={recording_sessions_has_artists} backendURL={backendURL} refreshRecordingSessionshasArtists={getData}/>
                            ))}
        
                        </tbody>
                    </table>
                    
                    <AddRecordingSessionshasArtistsForm recording_sessions_has_artists={recording_sessions_has_artists} recording_sessions={recording_sessions} artists={artists} backendURL={backendURL} refreshRecordingSessionshasArtists={getData} />  
                    <UpdateRecordingSessionshasArtistsForm recording_sessions_has_artists={recording_sessions_has_artists} recording_sessions={recording_sessions} artists={artists} backendURL={backendURL} refreshRecordingSessionshasArtists={getData} />          
                </>
        );

}   export default Recording_Sessions_has_Artists;