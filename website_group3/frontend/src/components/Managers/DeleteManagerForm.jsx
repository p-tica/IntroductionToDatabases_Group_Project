// Citation for starter code 
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteManagerForm = ({ rowObject, backendURL, refreshManagers }) => {
    const managerName = rowObject.Name;

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
       
        const formData = {
            delete_manager_ID: rowObject.manager_ID,
            delete_manager_name: managerName,
        };

        try {
            const response = await fetch(backendURL + '/managers/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                console.log("Manager deleted successfully.");
                refreshManagers();
            } else {
                console.error("Error deleting Manager.");
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

export default DeleteManagerForm;