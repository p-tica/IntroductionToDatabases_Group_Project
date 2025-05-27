// Citation for starter code 
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code in lines 40-43 (clearing form fields after submit is pressed) adapted from Microsoft Copilot (see UpdateManagerForm.jsx)
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import React, { useState } from 'react';

const AddRecordingSessionForm = ({ rooms, backendURL, refreshRecordingSessions }) => {
    const [formData, setFormData] = useState({
        create_recording_session_room_ID: '',
        create_recording_session_duration: ''
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
            const response = await fetch(backendURL + '/recording_sessions/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Recording Session added successfully.");
                refreshRecordingSessions();

                // Clear form fields by resetting state
                setFormData({
                    create_recording_session_room_ID: '',
                    create_recording_session_duration: ''
                });
            } else {
                console.error("Error adding Recording Session.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };
    return (
        <>
        <h2>Add a Recording Session</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_recording_session_room_ID">Room: </label>
            <select
                name="create_recording_session_room_ID"
                id="create_recording_session_room_ID"
                value={formData.create_recording_session_room_ID}
                onChange={handleChange}
                required
            >
                <option value="">Select a Room</option>
                {rooms.map((rooms, index) => (
                    <option value={rooms.room_ID} key={index}>{rooms.room_ID}</option>
                ))}
            </select>

            <label htmlFor="create_recording_session_duration">Duration: </label>
            <input
                type="number"
                name="create_recording_session_duration"
                id="create_recording_session_duration"
                step='0.25'
                value={formData.create_recording_session_duration}
                onChange={handleChange}
                required
            />

            <input type="submit" />
        </form>
        </>
    );

} 

export default AddRecordingSessionForm;