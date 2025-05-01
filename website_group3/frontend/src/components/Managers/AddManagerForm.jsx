const AddManagerForm = ({ backendURL, refreshManagers }) => {

    return (
        <>
        <h2>Add a Manager</h2>

        <form className='cuForm'>

            <label htmlFor="add_manager_name">Name: </label>
            <input
                type="text"
                name="add_manager_name"
                id="add_manager_name"
            />

            <label htmlFor="add_manager_phone_number">Phone Number: </label>
            <input
                type="text"
                name="add_manager_phone_number"
                id="add_manager_phone_number"
            />

            <label htmlFor="add_manager_email">Email: </label>
            <input
                type="text"
                name="add_manager_email"
                id="add_manager_email"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddManagerForm;