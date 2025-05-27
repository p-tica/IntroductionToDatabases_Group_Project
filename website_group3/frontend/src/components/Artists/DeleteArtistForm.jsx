// Citation for starter code 
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// code in lines 33-40 copied from Microsoft Copilot
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com
// AI Tools Prompt: "How can I add a window.alert when a user tries to delete an artist who has a recording session? [Pasted this file]"

const DeleteArtistForm = ({ rowObject, backendURL, refreshArtists }) => {
    const artistName = rowObject.Name;

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
       
        const formData = {
            delete_artist_ID: rowObject.artist_id,
            delete_artist_name: artistName,
        };

        try {
            const response = await fetch(backendURL + '/artists/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                console.log("Artist deleted successfully.");
                refreshArtists();
            } else {
                const errorData = await response.json();
                if (response.status === 400) {
                    // Show the error message from backend
                    window.alert(errorData.message);
                } else {
                    console.error("Error deleting artist.");
                    window.alert("An error occurred while deleting the artist.");
                }
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

export default DeleteArtistForm;