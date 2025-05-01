import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowManagers from '../components/Managers/TableRowManagers';
import AddManagerForm from '../components/Managers/AddManagerForm';
import UpdateManagerForm from '../components/Managers/UpdateManagerForm';


function Managers({ backendURL }) {

    // Set up a state variable `managers` to store and display the backend response
    const [managers, setManagers] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/managers');
            
            // Convert the response into JSON format
            const {managers} = await response.json();
    
            // Update the managers state with the response data
            setManagers(managers);
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }

    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Managers</h1>

            <table>
                <thead>
                    <tr>
                        {managers.length > 0 && Object.keys(managers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {managers.map((managers, index) => (
                        <TableRowManagers key={index} rowObject={managers} backendURL={backendURL} refreshManagers={getData}/>
                    ))}

                </tbody>
            </table>
            
            <AddManagerForm managers={managers} backendURL={backendURL} refreshManagers={getData} />
            <UpdateManagerForm managers={managers} backendURL={backendURL} refreshManagers={getData} />               
        </>
    );

} export default Managers;