import DeleteRecordingSessionshasArtistsForm from './DeleteRecordingSessionshasArtistsForm';

const TableRowRecordingSessionshasArtists = ({ rowObject, backendURL, refreshManagers }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeleteRecordingSessionshasArtistsForm rowObject={rowObject} backendURL={backendURL} refreshManagers={refreshManagers} />
        </tr>
    );
}

export default TableRowRecordingSessionshasArtists