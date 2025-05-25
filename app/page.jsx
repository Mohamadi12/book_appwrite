import RoomCard from "@/components/RoomCard";
import rooms from "@/data/rooms.json";

const Home = () => {
  return (
    <>
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} key={room.$id} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
};

export default Home;
