const AddRoomForm = ({ backendURL, refreshRooms }) => {

    return (
        <>
        <h2>Add a Room</h2>

        <form className='cuForm'>

            <label htmlFor="add_room_square_footage">Square Footage: </label>
            <input
                type="text"
                name="add_room_square_footage"
                id="add_room_square_footage"
            />

            <label htmlFor="add_room_floor">Floor: </label>
            <input
                type="text"
                name="add_room_floor"
                id="add_room_floor"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddRoomForm;