// Citation for following page:
// Date: 05/22/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code in lines 44-48 (clearing form fields after submit is pressed) copied from Microsoft Copilot
// Code adapted from the bsg files from Exploration - Web Application Technology
// Set input fields to required using mdn web docs. Webpage: HTML attribute: required
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com/chats/VtYAXL4FfdF2cCVsbvCD2
// URL: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required
// AI Tools Prompt: "[Included this page in my prompt] What change can I make so that the data that I just 
// entered in the Add a Manager fields doesn't remain in those fields after submit is pressed?"

import React, { useState } from 'react';

const AddManagerForm = ({ backendURL, refreshManagers }) => {
    const [formData, setFormData] = useState({
        create_manager_name: '',
        create_manager_phone_number: '',
        create_manager_email: ''
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
            const response = await fetch(backendURL + '/managers/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Manager added successfully.");
                refreshManagers();

                // Clear form fields by resetting state
                setFormData({
                    create_manager_name: '',
                    create_manager_phone_number: '',
                    create_manager_email: ''
                });
            } else {
                console.error("Error adding manager.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Add a Manager</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_manager_name">Name: </label>
            <input
                type="text"
                name="create_manager_name"
                id="create_manager_name"
                value={formData.create_manager_name}
                onChange={handleChange}
                required
            />

            <label htmlFor="create_manager_phone_number">Phone Number: </label>
            <input
                type="text"
                name="create_manager_phone_number"
                id="create_manager_phone_number"
                value={formData.create_manager_phone_number}
                onChange={handleChange}
                required
            />

            <label htmlFor="create_manager_email">Email: </label>
            <input
                type="text"
                name="create_manager_email"
                id="create_manager_email"
                value={formData.create_manager_email}
                onChange={handleChange}
                required
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddManagerForm;