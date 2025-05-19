// Citation for starter code 
// Date: 05/22/2025
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const AddRecordingSessionForm = ({ rooms }) => {
console.log(rooms)
    return (
        <>
        <h2>Add a Recording Session</h2>

        <form className='cuForm'>

            <label htmlFor="add_room">Room: </label>
            <select
                name="add_room"
                id="add_room"
            >
                <option value="">Select a Room</option>
                {rooms.map((rooms, index) => (
                    <option value={rooms.room_id} key={index}>{rooms.room_ID}</option>
                ))}
            </select>

            <label htmlFor="add_duration">Duration: </label>
            <input
                type="number"
                name="add_duration"
                id="add_duration"
                step='0.25'
            />

            <input type="submit" />
        </form>
        </>
    );

} 

export default AddRecordingSessionForm;