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