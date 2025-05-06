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