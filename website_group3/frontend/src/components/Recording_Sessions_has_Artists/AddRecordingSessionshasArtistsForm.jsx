// Citation for starter code 
// Date: 05/22/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code in lines 40-43 (clearing form fields after submit is pressed) adapted from Microsoft Copilot (see UpdateManagerForm.jsx)
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import React, { useState } from 'react';

const AddRecordingSessionshasArtistsForm = ({ recording_sessions, artists, backendURL, refreshRecordingSessionshasArtists,} ) => {
    const [formData, setFormData] = useState({
        add_session_id: '',
        add_artist_id: ''
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
                    add_session_id: '',
                    add_artist_id: ''
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

            <label htmlFor="add_session_id">Session: </label>
            <select
                name="add_session_id"
                id="add_session_id"
                value={formData.add_session_id}
                onChange={handleChange}
                required
            >
                <option value="">Select a Session</option>
                {recording_sessions.map((recording_sessions, index) => (
                    <option value={recording_sessions.id} key={index}>{recording_sessions.session_ID}</option>
                ))}
            </select>

            <label htmlFor="add_artist_id">Artist: </label>
            <select
                name="add_artist_id"
                id="add_artist_id"
                value={formData.add_artist_id}
                onChange={handleChange}
                required
            >
                <option value="">Select an Artist</option>
                {artists.map((artists, index) => (
                    <option value={artists.id} key={index}>{artists.name}</option>
                ))}
            </select>
            <input type="submit" />
        </form>
        </>
    );

}

export default AddRecordingSessionshasArtistsForm