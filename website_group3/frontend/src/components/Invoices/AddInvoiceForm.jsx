// Citation for starter code 
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code in lines 46-50 (clearing form fields after submit is pressed) adapted from Microsoft Copilot (see UpdateManagerForm.jsx)
// Code in line 95 copied from user Mikel Rychliski on Stack Overflow (URL below)
// URL: https://stackoverflow.com/a/31575897/30652475
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com
// AI Tools Prompt: "[Included this page in my prompt] What can I change so that the dropdown menu for selecting a recording session works again?
// If I delete the javascript it updates but if I leave it I can select a value but it doesn't remain selected"

import React, { useState } from 'react';

const AddInvoiceForm = ({ backendURL, recording_sessions, refreshInvoices }) => {
    const [formData, setFormData] = useState({
        create_invoice_session_ID: '',
        create_invoice_session_cost: '',
        create_invoice_invoice_paid: ''
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
                    create_invoice_session_ID: '',
                    create_invoice_session_cost: '',
                    create_invoice_invoice_paid: ''
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

            <label htmlFor="create_invoice_session_ID">Recording Session: </label>
            <select
                name="create_invoice_session_ID"
                id="create_invoice_session_ID"
                value={formData.create_invoice_session_ID}
                onChange={handleChange}
                required
            >
                <option value="">Select a Recording Session</option>
                {recording_sessions.map((recording_sessions, index) => (
                    <option value={recording_sessions.session_ID} key={index}>{recording_sessions.session_ID}</option>
                ))}
            </select>

            <label htmlFor="create_invoice_session_cost">Cost: </label>
            <input
                type="number"
                name="create_invoice_session_cost"
                id="create_invoice_session_cost"
                value={formData.create_invoice_session_cost}
                onChange={handleChange}
                required
            />

            <label htmlFor="create_invoice_invoice_paid">Paid: </label>
            <input
                type="number"
                name="create_invoice_invoice_paid"
                id="create_invoice_invoice_paid"
                max='1'
                min='0'
                value={formData.create_invoice_invoice_paid}
                onChange={handleChange}
                required
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddInvoiceForm;
