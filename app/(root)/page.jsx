import dynamic from 'next/dynamic';
import { fetchListings } from "@/lib/actions/listing.actions";
import Image from "next/image";
import Link from "next/link";

// Function to transform fetched data into a plain object
const transformListings = (listings) => {
  return listings.map((listing) => ({
    _id: listing._id.toString(),
    title: listing.title,
    description: listing.description,
    image: listing.image,
    price: listing.price,
    location: listing.location,
    country: listing.country,
  }));
};

const fetchData = async () => {
  const result = await fetchListings();
  const plainListings = transformListings(result);
  return plainListings
};

const Listings = dynamic(() => import('@/components/Listings'), {
  ssr: false,
});

export default async function Home() {

  const plainListings = await fetchData()
  return (
    <main className="flex-col flex-center max-w-full px-10">
      <Listings listings={plainListings} />
    </main>
  );
}