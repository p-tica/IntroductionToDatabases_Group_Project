// Citation for starter code
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

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