import Listings from "@/components/Listings";
import { fetchListings } from "@/lib/actions/listing.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const result = await fetchListings();
  return (
    <main className="flex-col flex-center max-w-full px-10">
      <Listings listings={result.allListings}/>
    </main>
  );
}
