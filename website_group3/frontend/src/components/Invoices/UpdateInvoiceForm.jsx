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