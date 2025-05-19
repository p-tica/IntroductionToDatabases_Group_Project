// Citation for starter code 
// Date: 05/22/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import React, { useState } from 'react';

const AddInvoiceForm = ({ recording_sessions, backendURL }) => {
    const [formData, setFormData] = useState({
        add_recording_session_ID: '',
        add_session_cost: '',
        add_paid: ''
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
            const response = await fetch(backendURL + '/invoices/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Invoice added successfully.");
                refreshInvoices();

                // Clear form fields by resetting state
                setFormData({
                    add_recording_session_ID: '',
                    add_session_cost: '',
                    add_paid: ''
                });
            } else {
                console.error("Error adding Invoice.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };
    return (
        <>
        <h2>Add an Invoice</h2>

        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="add_recording_session_id">Recording Session: </label>
            <select
                name="add_recording_session_id"
                id="add_recording_session_id"
                value={formData.add_recording_session_ID}
                onChange={handleChange}
            >
                <option value="">Select a Recording Session</option>
                {recording_sessions.map((recording_sessions, index) => (
                    <option value={recording_sessions.id} key={index}>{recording_sessions.session_ID}</option>
                ))}
            </select>

            <label htmlFor="add_session_cost">Cost: </label>
            <input
                type="number"
                name="add_session_cost"
                id="add_session_cost"
                value={formData.add_session_cost}
                onChange={handleChange}
                required
            />

            <label htmlFor="add_paid">Paid: </label>
            <input
                type="number"
                name="add_paid"
                id="add_paid"
                value={formData.add_paid}
                onChange={handleChange}
                required
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddInvoiceForm;