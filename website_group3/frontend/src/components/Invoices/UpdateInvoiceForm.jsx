// Citation for starter code 
// Date: 05/22/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const UpdateInvoiceForm = ({ invoices, recording_sessions }) => {

    return (
        <>
        <h2>Update an Invoice</h2>
        <form className='cuForm'>

            <label htmlFor="update_invoice_id">Invoice: </label>
            <select
                name="update_invoice_id"
                id="update_invoice_id"
            >
                <option value="">Select an Invoice</option>
                {invoices.map((invoice, index) => (
                    <option value={invoice.id} key={index}>{invoice.invoice_ID}</option>
                ))}
            </select>

            <label htmlFor="update_recording_session_id">Recording Session: </label>
            <select
                name="update_recording_session_id"
                id="update_recording_session_id"
            >
                <option value="">Select a Recording Session</option>
                {recording_sessions.map((recording_session, index) => (
                    <option value={recording_session.session_id} key={index}>{recording_session.session_ID}</option>
                ))}
            </select>

            <label htmlFor="update_sessionc_cost">Cost: </label>
            <input
                type="number"
                name="update_sessionc_cost"
                id="update_sessionc_cost"
            />

            <label htmlFor="update_paid">Paid: </label>
            <input
                type="number"
                name="update_paid"
                id="update_paid"
            />

            <input type="submit" />
        </form>
        </>
    );

} 

export default UpdateInvoiceForm;