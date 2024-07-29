import Link from "next/link";
import Listings from "@/components/Listings";

const Home = () => {
  return (
    <section className="w-full flex-center mt-[-100px] min-h-screen flex-col">
      <h1 className="head_text text-center">
        Discover & Stay
        <br  />
        <span className="text-center orange_gradient">Find Your Perfect Hotel</span>
      </h1>
      <p className="desc text-center">
        RoomRoam is your ultimate destination for discovering, booking, and experiencing the best hotels around the world. Explore our curated listings and find the perfect place for your next stay.
      </p>
      <Link href="/home">
        <p className="mt-5 px-10 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-300">
          Explore Listings
        </p>
      </Link>
    </section>
  );
};

export default Home;
