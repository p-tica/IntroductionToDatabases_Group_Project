const AddRecordingSessionshasArtistsForm = ({ recording_sessions, artists} ) => {

    return (
        <>
        <h2>Pair a Recording Session and Artist</h2>

        <form className='cuForm'>

            <label htmlFor="add_session_id">Session: </label>
            <select
                name="add_session_id"
                id="add_session_id"
            >
                <option value="">Select a Session</option>
                {recording_sessions.map((recording_sessions, index) => (
                    <option value={recording_sessions.id} key={index}>{recording_sessions.session_ID}</option>
                ))}
            </select>

            <label htmlFor="add_artist_id">Artist: </label>
            <select
                name="add_artist_id"
                id="add_artist_id"
            >
                <option value="">Select an Artist</option>
                {artists.map((artists, index) => (
                    <option value={artists.id} key={index}>{artists.name}</option>
                ))}
            </select>
            <input type="submit" />
        </form>
        </>
    );

}

export default AddRecordingSessionshasArtistsForm