// Citation for starter code 
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code in lines 41-44 (clearing form fields after submit is pressed) adapted from Microsoft Copilot (see UpdateManagerForm.jsx)
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com

import React, { useState } from 'react';

const AddRecordingSessionshasArtistsForm = ({ recording_sessions, artists, backendURL, refreshRecordingSessionshasArtists,} ) => {
    const [formData, setFormData] = useState({
        create_recording_session_has_artists_session_ID: '',
        create_recording_session_has_artists_artist_ID: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch(backendURL + '/recording_sessions_has_artists/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Recording Session and Artist paired successfully.");
                refreshRecordingSessionshasArtists();

                // Clear form fields by resetting state
                setFormData({
                    create_recording_session_has_artists_session_ID: '',
                    create_recording_session_has_artists_artist_ID: ''
                });
            } else {
                console.error("Error pairing Recording Session and Artist.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };
    return (
        <>
        <h2>Pair a Recording Session and Artist</h2>

        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="create_recording_session_has_artists_session_ID">Session: </label>
            <select
                name="create_recording_session_has_artists_session_ID"
                id="create_recording_session_has_artists_session_ID"
                value={formData.create_recording_session_has_artists_session_ID}
                onChange={handleChange}
                required
            >
                <option value="">Select a Session</option>
                {recording_sessions.map((recording_sessions, index) => (
                    <option value={recording_sessions.session_ID} key={index}>{recording_sessions.session_ID}</option>
                ))}
            </select>

            <label htmlFor="create_recording_session_has_artists_artist_ID">Artist: </label>
            <select
                name="create_recording_session_has_artists_artist_ID"
                id="create_recording_session_has_artists_artist_ID"
                value={formData.create_recording_session_has_artists_artist_ID}
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

export default AddRecordingSessionshasArtistsForm