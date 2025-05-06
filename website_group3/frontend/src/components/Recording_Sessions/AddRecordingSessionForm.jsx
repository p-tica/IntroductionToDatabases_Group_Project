const AddRecordingSessionForm = ({ rooms }) => {

    return (
        <>
        <h2>Add an Artist</h2>

        <form className='cuForm'>

            <label htmlFor="add_room">Room: </label>
            <select
                name="add_room"
                id="add_room"
            >
                <option value="">Select a Room</option>
                {rooms.map((rooms, index) => (
                    <option value={rooms.room_id} key={index}></option>
                ))}
            </select>

            <label htmlFor="add_duration">Duration: </label>
            <input
                type="number"
                name="add_duration"
                id="add_duration"
            />

            <input type="submit" />
        </form>
        </>
    );

} 

export default AddRecordingSessionForm;