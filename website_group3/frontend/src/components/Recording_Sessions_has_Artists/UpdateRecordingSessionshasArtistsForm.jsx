import Recording_Sessions_has_Artists from "../../pages/Recording_Sessions_has_Artists";

const UpdateRecordingSessionshasArtistsForm = ({ recording_sessions_has_artists, recording_sessions, artists }) => {

    return (
        <>
        <h2>Add an Artist</h2>

        <form className='cuForm'>

            <label htmlFor="update_recording_sessions_has_artists_id">Session: </label>
            <select
                name="update_recording_sessions_has_artists_id"
                id="update_recording_sessions_has_artists_id"
            >
                <option value="">Select a Session/Artist pairing</option>
                <option value="NULL">&lt; None &gt;</option>
                {recording_sessions_has_artists.map((recording_sessions_has_artists, index) => (
                    <option value={recording_sessions_has_artists.id} key={recording_sessions_has_artists.id}></option>
                ))}
            </select>
            
            <label htmlFor="update_session_id">Session: </label>
            <select
                name="update_session_id"
                id="update_session_id"
            >
                <option value="">Select a Session</option>
                <option value="NULL">&lt; None &gt;</option>
                {recording_sessions.map((recording_sessions, index) => (
                    <option value={recording_sessions.id} key={recording_sessions.id}></option>
                ))}
            </select>

            <label htmlFor="update_artist_id">Artist: </label>
            <select
                name="update_artist_id"
                id="update_artist_id"
            >
                <option value="">Select an Artist</option>
                <option value="NULL">&lt; None &gt;</option>
                {artists.map((artists, index) => (
                    <option value={artists.name} key={artists.id}></option>
                ))}
            </select>

        </form>
        </>
    );

}

export default UpdateRecordingSessionshasArtistsForm