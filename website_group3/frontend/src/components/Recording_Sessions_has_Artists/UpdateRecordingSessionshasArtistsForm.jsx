// Citation for starter code 
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code in lines 40-44 (clearing form fields after submit is pressed) adapted from Microsoft Copilot (see UpdateManagerForm.jsx)
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import React, { useState } from 'react';

const UpdateRecordingSessionshasArtistsForm = ({ recording_sessions_has_artists, recording_sessions, artists, backendURL, refreshRecordingSessionshasArtists}) => {
    const [formData, setFormData] = useState({
        update_recording_session_and_artist_pairing_ID: '',
        update_recording_session_and_artist_pairing_session_ID: '',
        update_recording_session_and_artist_pairing_artist_ID: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle the update logic here

        try {
            const response = await fetch(backendURL + '/recording_sessions_has_artists/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Recording Session and Artist pairing updated successfully.");
                refreshRecordingSessionshasArtists();
                setFormData({
                    update_recording_session_and_artist_pairing_ID: '',
                    update_recording_session_and_artist_pairing_session_ID: '',
                    update_recording_session_and_artist_pairing_artist_ID: ''
                })
            } else {
                console.error("Error updating Recording Session and Artist pairing.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };
    return (
        <>
        <h2>Update a Session/Artist pairing</h2>

        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="update_recording_session_and_artist_pairing_ID">Pairing: </label>
            <select
                name="update_recording_session_and_artist_pairing_ID"
                id="update_recording_session_and_artist_pairing_ID"
                value={formData.update_recording_session_and_artist_pairing_ID}
                onChange={handleChange}
                required
            >
                <option value="">Select a Session/Artist pairing</option>
                {recording_sessions_has_artists.map((recording_sessions_has_artists, index) => (
                    <option value={recording_sessions_has_artists.id} key={index}>{recording_sessions_has_artists.Pairing}</option>
                ))}
            </select>
            
            <label htmlFor="update_recording_session_and_artist_pairing_session_ID">Session: </label>
            <select
                name="update_recording_session_and_artist_pairing_session_ID"
                id="update_recording_session_and_artist_pairing_session_ID"
                value={formData.update_recording_session_and_artist_pairing_session_ID}
                onChange={handleChange}
                required
            >
                <option value="">Select a Session</option>
                {recording_sessions.map((recording_sessions, index) => (
                    <option value={recording_sessions.id} key={index}>{recording_sessions.session_ID}</option>
                ))}
            </select>

            <label htmlFor="update_recording_session_and_artist_pairing_artist_ID">Artist: </label>
            <select
                name="update_recording_session_and_artist_pairing_artist_ID"
                id="update_recording_session_and_artist_pairing_artist_ID"
                value={formData.update_recording_session_and_artist_pairing_artist_ID}
                onChange={handleChange}
                required
            >
                <option value="">Select an Artist</option>
                {artists.map((artist, index) => (
                    <option value={artist.artist_ID} key={index}>{artist.name}</option>
                ))}
            </select>

            <input type="submit" />
        </form>
        </>
    );

}

export default UpdateRecordingSessionshasArtistsForm