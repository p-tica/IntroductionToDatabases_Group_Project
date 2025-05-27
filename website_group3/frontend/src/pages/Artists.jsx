// Citation for starter code
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowArtists from '../components/Artists/TableRowArtists';
import AddArtistForm from '../components/Artists/AddArtistForm';
import UpdateArtistForm from '../components/Artists/UpdateArtistForm';


function Artists({ backendURL }) {

    // Set up a state variable `artists` to store and display the backend response
    const [artists, setArtists] = useState([]);
    const [managers, setManagers] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/artists');
            
            // Convert the response into JSON format
            const {artists, managers} = await response.json();
    
            // Update the artists state with the response data
            setArtists(artists);
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
            <h1>Artists</h1>

            <table>
                <thead>
                    <tr>
                        {artists.length > 0 && Object.keys(artists[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {artists.map((artists, index) => (
                        <TableRowArtists key={index} rowObject={artists} backendURL={backendURL} refreshArtists={getData}/>
                    ))}

                </tbody>
            </table>
            
            <AddArtistForm managers={managers} backendURL={backendURL} refreshArtists={getData} />
            <UpdateArtistForm artists={artists} managers={managers} backendURL={backendURL} refreshArtists={getData} />               
        </>
    );

} export default Artists;