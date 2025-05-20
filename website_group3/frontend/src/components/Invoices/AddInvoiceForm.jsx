// Citation for starter code 
// Date: 05/22/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968


const AddInvoiceForm = ({ recording_sessions }) => {

    return (
        <>
        <h2>Add an Invoice</h2>

        <form className='cuForm'>

            <label htmlFor="add_recording_session_id">Recording Session: </label>
            <select
                name="add_recording_session_id"
                id="add_recording_session_id"
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
            />

            <label htmlFor="add_paid">Paid: </label>
            <input
                type="number"
                name="add_paid"
                id="add_paid"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddInvoiceForm;