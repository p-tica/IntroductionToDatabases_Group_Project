import DeleteRecordingSessionshasArtistsForm from './DeleteRecordingSessionshasArtistsForm';

const TableRowRecordingSessionshasArtists = ({ rowObject, backendURL, refreshRecordingSessionshasArtists }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeleteRecordingSessionshasArtistsForm rowObject={rowObject} backendURL={backendURL} refreshRecordingSessionshasArtists={refreshRecordingSessionshasArtists} />
        </tr>
    );
}

export default TableRowRecordingSessionshasArtists