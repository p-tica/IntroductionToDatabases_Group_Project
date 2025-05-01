const AddArtistForm = ({ managers, backendURL, refreshArtists }) => {

    return (
        <>
        <h2>Add an Artist</h2>

        <form className='cuForm'>

            <label htmlFor="add_artist_manager">Manager: </label>
            <select
                name="add_artist_manager"
                id="add_artist_manager"
            >
                <option value="">Select a Manager</option>
                <option value="NULL">&lt; None &gt;</option>
                {managers.map((managers, index) => (
                    <option value={managers.id} key={index}>{managers.name}</option>
                ))}
            </select>

            <label htmlFor="add_artist_name">Name: </label>
            <input
                type="text"
                name="add_artist_name"
                id="add_artist_name"
            />

            <label htmlFor="add_artist_phone_number">Phone Number: </label>
            <input
                type="text"
                name="add_artist_phone_number"
                id="add_artist_phone_number"
            />

            <label htmlFor="add_artist_email">Email: </label>
            <input
                type="text"
                name="add_artist_email"
                id="add_artist_email"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddArtistForm;