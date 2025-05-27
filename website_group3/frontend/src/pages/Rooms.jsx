// Citation for starter code
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowRooms from '../components/Rooms/TableRowRooms';
import AddRoomForm from '../components/Rooms/AddRoomForm';


function Rooms({ backendURL }) {

    // Set up a state variable `artists` to store and display the backend response
    const [rooms, setRooms] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/rooms');
            
            // Convert the response into JSON format
            const {rooms} = await response.json();
    
            // Update the rooms state with the response data
            setRooms(rooms);
            
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
            <h1>Rooms</h1>

            <table>
                <thead>
                    <tr>
                        {rooms.length > 0 && Object.keys(rooms[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rooms.map((room, index) => (
                        <TableRowRooms key={index} rowObject={room} backendURL={backendURL} refreshRooms={getData}/>
                    ))}

                </tbody>
            </table>
            
            <AddRoomForm rooms={rooms} backendURL={backendURL} refreshRooms={getData} />            
        </>
    );

} export default Rooms;