import React from "react";
import Link from "next/link";

function ListingCard({listing}) {
  return (
    <Link href={`/listing/${listing._id}`}>
      <div className="card h-80 w-72 shadow-lg bg-slate-100 rounded-3xl">
        <img
          src={listing?.image}
          className="h-3/4 rounded-t-3xl w-full hover:opacity-80"
        />
        <div className="p-4">
          <h5>{listing.title}</h5>
          <p>
            &#8377;
            {true ? listing.price + listing.price * 0.18 : listing.price}/ Night
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
