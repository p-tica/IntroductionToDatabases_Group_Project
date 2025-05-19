const ResetButton = ({ backendURL}) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch(backendURL + '/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log("Invoice added successfully.");

            } else {
                console.error("Error resetting database.");
            }
        } catch (error) {
            console.error('Error during reset:', error);
        }
    };
    return (
        <form>
            <button type='submit'
            onClick={handleSubmit}>
                Reset
            </button>
        </form>

    );
};

export default ResetButton;