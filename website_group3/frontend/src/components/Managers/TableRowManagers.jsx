import DeleteManagerForm from './DeleteManagerForm';

const TableRowManagers = ({ rowObject, backendURL, refreshManagers }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteManagerForm rowObject={rowObject} backendURL={backendURL} refreshManagers={refreshManagers} />
        </tr>
    );
};

export default TableRowManagers;