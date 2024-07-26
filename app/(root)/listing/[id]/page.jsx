import { fetchListingByID } from "@/lib/actions/listing.actions";
import React from "react";
import ShowListing from "@/components/ShowListing";
import Image from "next/image";
import ReviewCard from "@/components/ReviewCard";
import { formatDateString } from "@/lib/utils";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
async function page({ params }) {
  let result = await fetchListingByID(params.id);
  const listing = result.listing

  return (
    <div className="mb-20 container lg:mx-auto lg:w-4/6 h-full md:w-5/6 sm:w-full">
      <div className="flex flex-col">
        <h3 className="head_text blue_gradient my-5">
          <span>{listing?.title}</span>
        </h3>
        <div className="w-full h-[30vw] overflow-hidden bg-slate-400 rounded-2xl relative">
          <Image
            src={listing?.image}
            alt="listing_image"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-gray-300 mt-1 text-sm">
          Owned By : {listing?.owner?.username}
        </p>
        <p className="desc">{listing?.description}</p>
        <p className="text-slate-100 mt-2 text-xl">
          {listing?.location}, <span>{listing?.country}</span>
        </p>
        <p className=" font-bold text-lg text-slate-100 text-start mt-2">
          &#8377;{listing?.price}/ Night
        </p>

        <ShowListing id={listing?._id} ownerId={listing?.owner?.id} />

        <p className="head_text my-8">Reviews</p>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          {listing.reviews.length > 0 ? (
            listing.reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  reviewId={review._id}
                  comment={review.comment}
                  rating={review.rating}
                  username={review.author.username}
                  image={review.author.image || null}
                  date={formatDateString(review.createAt)}
                  listingId={listing._id}
                  authorId={review.author?.id}
                />
            ))
          ) : (
            <p className="desc_text">No reviews for this listing.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
