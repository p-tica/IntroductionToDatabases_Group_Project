// Citation for following page:
// Date: 05/22/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code in lines 39-44 (clearing form fields after submit is pressed) copied from Microsoft Copilot
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com/chats/VtYAXL4FfdF2cCVsbvCD2
// AI Tools Prompt: "[Included this page in my prompt] What change can I make so that the data that I just 
// entered in the add an artist fields doesn't remain in those fields after submit is pressed?"

import React, { useState } from 'react';

const AddArtistForm = ({ managers, backendURL, refreshArtists }) => {
    const [formData, setFormData] = useState({
        create_artist_manager_ID: '',
        create_artist_name: '',
        create_artist_phone_number: '',
        create_artist_email: ''
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
            const response = await fetch(backendURL + '/artists/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Artist added successfully.");
                refreshArtists();

                // Clear form fields by resetting state
                setFormData({
                    create_artist_manager_ID: '',
                    create_artist_name: '',
                    create_artist_phone_number: '',
                    create_artist_email: ''
                });
            } else {
                console.error("Error adding artist.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Add an Artist</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_artist_manager_ID">Manager: </label>
            <select
                name="create_artist_manager_ID"
                id="create_artist_manager_ID"
                value={formData.create_artist_manager_ID}
                onChange={handleChange}
            >
                <option value="">Select a Manager</option>
                <option value="NULL">&lt; None &gt;</option>
                {managers.map((manager, index) => (
                    <option value={manager.manager_ID} key={index}>{manager.name}</option>
                ))}
            </select>

            <label htmlFor="create_artist_name">Name: </label>
            <input
                type="text"
                name="create_artist_name"
                id="create_artist_name"
                value={formData.create_artist_name}
                onChange={handleChange}
            />

            <label htmlFor="create_artist_phone_number">Phone Number: </label>
            <input
                type="text"
                name="create_artist_phone_number"
                id="create_artist_phone_number"
                value={formData.create_artist_phone_number}
                onChange={handleChange}
            />

            <label htmlFor="create_artist_email">Email: </label>
            <input
                type="text"
                name="create_artist_email"
                id="create_artist_email"
                value={formData.create_artist_email}
                onChange={handleChange}
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddArtistForm;