// Citation:
// Date: 06/09/2025
// Code based on MDN Web Docs for window.confirm and window.location.reload()
// URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
// URL: https://developer.mozilla.org/en-US/docs/Web/API/Location/reload

const ResetButton = ({ backendURL }) => {

    const handleReset = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const confirmed = window.confirm("Reset all data?");

        if (confirmed) {
            try {
                const response = await fetch(backendURL + '/resetbutton', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    console.log("Database reset successfully.");
                    window.location.reload();
                } else {
                    console.error(`Error resetting database: ${await response.text()}`);
                }
            } catch (error) {
                console.error('Error during reset:', error);
            }
        }
    };
    return (
        <button 
            onClick={handleReset} 
            className="reset-button">
            RESET
        </button>

    );
};

export default ResetButton;