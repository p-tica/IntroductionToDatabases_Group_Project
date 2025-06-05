// Citation for starter code
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

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