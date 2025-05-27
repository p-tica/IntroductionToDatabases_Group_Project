// Citation for following page:
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code in lines 45-48 (clearing form fields after submit is pressed) copied from Microsoft Copilot
// Code adapted from the bsg files from Exploration - Web Application Technology
// Set input fields to required using mdn web docs. Webpage: HTML attribute: required
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com/chats/VtYAXL4FfdF2cCVsbvCD2
// URL: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required
// AI Tools Prompt: "[Included this page in my prompt] What change can I make so that the data that I just 
// entered in the Add a Room fields doesn't remain in those fields after submit is pressed?"

import React, { useState } from 'react';

const AddRoomForm = ({ backendURL, refreshRooms }) => {
    const [formData, setFormData] = useState({
        create_room_square_footage: '',
        create_room_floor: ''
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
            const response = await fetch(backendURL + '/rooms/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Room added successfully.");
                refreshRooms();

                // Clear form fields by resetting state
                setFormData({
                    create_room_square_footage: '',
                    create_room_floor: ''
                });
            } else {
                console.error("Error adding room.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Add a Room</h2>

        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="create_room_square_footage">Square Footage: </label>
            <input
                type="text"
                name="create_room_square_footage"
                id="create_room_square_footage"
                value={formData.create_room_square_footage}
                onChange={handleChange}
                required
            />

            <label htmlFor="create_room_floor">Floor: </label>
            <input
                type="text"
                name="create_room_floor"
                id="create_room_floor"
                value={formData.create_room_floor}
                onChange={handleChange}
                required
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddRoomForm;