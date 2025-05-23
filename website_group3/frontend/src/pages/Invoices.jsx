// Citation for starter code
// Date: 05/23/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowInvoices from '../components/Invoices/TableRowInvoices';
import AddInvoiceForm from '../components/Invoices/AddInvoiceForm';
import UpdateInvoiceForm from '../components/Invoices/UpdateInvoiceForm';

function Invoices({ backendURL }){

    // Set up a state variable `invoices` to store and display the backend response
    const [invoices, setInvoices] = useState([]);
    const [recording_sessions, setRecordingSessions] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/invoices');
            
            // Convert the response into JSON format
            const {invoices, recording_sessions} = await response.json();
    
            // Update the managers state with the response data
            setInvoices(invoices);
            setRecordingSessions(recording_sessions);
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Invoices</h1>

            <table>
                <thead>
                    <tr>
                        {invoices.length > 0 && Object.keys(invoices[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {invoices.map((invoices, index) => (
                        <TableRowInvoices key={index} rowObject={invoices} backendURL={backendURL} refreshInvoices={getData}/>
                    ))}

                </tbody>
            </table>
            
            <AddInvoiceForm invoices={invoices} recording_sessions={recording_sessions} backendURL={backendURL} refreshInvoices={getData} />
            <UpdateInvoiceForm invoices={invoices} recording_sessions={recording_sessions} backendURL={backendURL} refreshInvoices={getData} />               
        </>
    );
    
} export default Invoices;