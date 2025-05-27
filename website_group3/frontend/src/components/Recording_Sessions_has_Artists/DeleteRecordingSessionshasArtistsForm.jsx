// Citation for starter code 
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteRecordingSessionshasArtistsForm = ({ rowObject, backendURL, refreshRecordingSessionshasArtists }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        const formData = {
            delete_recording_session_and_artist_pairing_ID: rowObject.Pairing
        };

        try {
            const response = await fetch(backendURL + '/recording_sessions_has_artists/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                console.log("Recording Session and Artist pairing deleted successfully.");
                refreshRecordingSessionshasArtists();
            } else {
                console.error("Error deleting Recording Session and Artist pairing.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <td>
            <form onSubmit={handleSubmit}>
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeleteRecordingSessionshasArtistsForm;