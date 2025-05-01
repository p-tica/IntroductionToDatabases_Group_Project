const UpdateArtistForm = ({ artists, managers }) => {
   
    return (
        <>
        <h2>Update an Artist</h2>
        <form className='cuForm'>
            <label htmlFor="update_artist_id">Artist to Update: </label>
            <select
                name="update_artist_id"
                id="update_artist_id"
            >
                <option value="">Select an Artist</option>
                {artists.map((artist) => (
                    <option key={artist.artist_id} value={artist.artist_id}>
                        {artist.Name}
                    </option>
                ))}
            </select>

            <label htmlFor="update_artist_manager">Manager: </label>
            <select
                name="update_artist_manager"
                id="update_artist_manager"
            >
                <option value="">Select a Manager</option>
                <option value="NULL">&lt; None &gt;</option>
                {managers.map((managers) => (
                    <option key={managers.id} value={managers.id}>
                        {managers.name}
                    </option>
                ))}
            </select>

            <label htmlFor="update_artist_phone_number">Phone Number: </label>
            <input
                type="text"
                name="update_artist_phone_number"
                id="update_artist_phone_number"
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

export default UpdateArtistForm;