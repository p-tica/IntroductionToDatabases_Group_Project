// Citation for starter code
// Date: 05/08/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import DeleteArtistForm from './DeleteArtistForm';

const TableRowArtists = ({ rowObject, backendURL, refreshArtists }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteArtistForm rowObject={rowObject} backendURL={backendURL} refreshArtists={refreshArtists} />
        </tr>
    );
};

export default TableRowArtists;