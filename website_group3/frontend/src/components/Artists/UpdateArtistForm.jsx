// Citation for starter code 
// Date: 05/22/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code in lines 47-53 (clearing form fields after submit is pressed) copied from Microsoft Copilot
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com/chats/VtYAXL4FfdF2cCVsbvCD2
// AI Tools Prompt: "[Included this page in my prompt] What change can I make so that the data that I just 
// entered in the update an artist fields doesn't remain in those fields after submit is pressed?"

import React, { useState } from 'react';

const UpdateArtistForm = ({ artists, managers, backendURL, refreshArtists }) => {
    const [formData, setFormData] = useState({
        update_artist_ID: '',
        update_manager_ID: '',
        update_name: '',
        update_phone_number: '',
        update_email: ''
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
            const response = await fetch(backendURL + '/artists/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Artist updated successfully.");
                refreshArtists();

                // Clear form fields by resetting state
                setFormData({
                    update_artist_ID: '',
                    update_manager_ID: '',
                    update_name: '',
                    update_phone_number: '',
                    update_email: ''
                });
            } else {
                console.error("Error updating artist.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Update an Artist</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_artist_ID">Artist to Update: </label>
            <select
                name="update_artist_ID"
                id="update_artist_ID"
                value={formData.update_artist_ID}
                onChange={handleChange}
            >
                <option value="">Select an Artist</option>
                {artists.map((artist) => (
                    <option key={artist.artist_id} value={artist.artist_id}>
                        {artist.Name}
                    </option>
                ))}
            </select>

            <label htmlFor="update_manager_ID">Manager: </label>
            <select
                name="update_manager_ID"
                id="update_manager_ID"
                value={formData.update_manager_ID}
                onChange={handleChange}
            >
                <option value="">Select a Manager</option>
                <option value="NULL">&lt; None &gt;</option>
                {managers.map((manager) => (
                    <option key={manager.manager_ID} value={manager.manager_ID}>
                        {manager.name}
                    </option>
                ))}
            </select>

            <label htmlFor="update_name">Name: </label>
            <input
                type="text"
                name="update_name"
                id="update_name"
                value={formData.update_name}
                onChange={handleChange}
            />

            <label htmlFor="update_phone_number">Phone Number: </label>
            <input
                type="text"
                name="update_phone_number"
                id="update_phone_number"
                value={formData.update_phone_number}
                onChange={handleChange}
            />

            <label htmlFor="update_email">Email: </label>
            <input
                type="text"
                name="update_email"
                id="update_email"
                value={formData.update_email}
                onChange={handleChange}
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateArtistForm;