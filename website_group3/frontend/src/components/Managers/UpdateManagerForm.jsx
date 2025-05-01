const UpdateManagerForm = ({ managers }) => {

    return (
        <>
        <h2>Update a Manager</h2>
        <form className='cuForm'>
            <label htmlFor="update_manager_id">Manager to Update: </label>
            <select
                name="update_manager_id"
                id="update_manager_id"
            >
                <option value="">Select a Manager</option>
                {managers.map((managers) => (
                    <option key={managers.id} value={managers.id}>
                        {managers.Name}
                    </option>
                ))}
            </select>

            <label htmlFor="update_manager_phone_number">Phone Number: </label>
            <input
                type="text"
                name="update_manager_phone_number"
                id="update_manager_phone_number"
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

export default UpdateManagerForm;