// Citation for starter code 
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code in lines 45-50 (clearing form fields after submit is pressed) copied from Microsoft Copilot
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com
// AI Tools Prompt: "[Included this page in my prompt] What change can I make so that the data that I just 
// entered in the Update a Manager fields doesn't remain in those fields after submit is pressed?"

import React, { useState } from 'react';

const UpdateManagerForm = ({ managers, backendURL, refreshManagers }) => {
    console.log({managers})
    const [formData, setFormData] = useState({
        update_manager_ID: '',
        update_manager_name: '',
        update_manager_phone_number: '',
        update_manager_email: ''
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
            const response = await fetch(backendURL + '/managers/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Manager updated successfully.");
                refreshManagers();
                setFormData({
                    update_manager_ID: '',
                    update_manager_name: '',
                    update_manager_phone_number: '',
                    update_manager_email: ''
                })
            } else {
                console.error("Error updating manager.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Update a Manager</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_manager_ID">Manager to Update: </label>
            <select
                name="update_manager_ID"
                id="update_manager_ID"
                value={formData.update_manager_ID}
                onChange={handleChange}
            >
                <option value="">Select a Manager</option>
                {managers.map((manager) => (
                    <option key={manager['Manager ID']} value={manager['Manager ID']}>
                        {manager.Name}
                    </option>
                ))}
            </select>

            <label htmlFor="update_manager_name">Name: </label>
            <input
                type="text"
                name="update_manager_name"
                id="update_manager_name"
                value={formData.update_manager_name}
                onChange={handleChange}
                required
            />

            <label htmlFor="update_manager_phone_number">Phone Number: </label>
            <input
                type="text"
                name="update_manager_phone_number"
                id="update_manager_phone_number"
                value={formData.update_manager_phone_number}
                onChange={handleChange}
                required
            />

            <label htmlFor="update_manager_email">Email: </label>
            <input
                type="text"
                name="update_manager_email"
                id="update_manager_email"
                value={formData.update_manager_email}
                onChange={handleChange}
                required
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateManagerForm;