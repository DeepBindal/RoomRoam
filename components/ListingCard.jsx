import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

function ListingCard({ listing }) {
  return (
    <Link href={`/listing/${listing._id}`} className="w-full">
      <div
        className="relative block w-full mb-4 rounded-lg shadow-lg text-slate-200 hover:text-sky-400 overflow-hidden transition-shadow duration-300"
        style={{ height: "400px" }} // Set a fixed height for the card
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{ zIndex: 1 }}
        ></div>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${listing?.image})`,
            objectFit: "cover",
            zIndex: 0,
          }}
        ></div>
        <div
          className="relative p-6 flex w-full flex-col justify-between h-full"
          style={{ zIndex: 2 }}
        >
          <div className="w-full bg-inherit hover:shadow-lg">
            <h2 className="text-xl w-full font-extrabold mb-4">{listing.title}</h2>
            <p>
              {listing.location}, {listing.country}
            </p>
            <p>
              &#8377;
              {true ? listing.price + listing.price * 0.18 : listing.price}/
              Night
            </p>
          </div>
          <Button as="Link" href={`/listing/${listing._id}`} className="bg-inherit text-slate-200 hover:text-sky-400">Learn More</Button>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;