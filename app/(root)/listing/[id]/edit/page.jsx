import React from 'react';
import { fetchListingByID } from "@/lib/actions/listing.actions";
import Editlistingform from '@/components/Editlistingform';

const transformListing = (listing) => {
  return {
    // _id: listing._id.toString(),
    title: listing.title,
    description: listing.description,
    image: listing.image,
    price: listing.price,
    location: listing.location,
    country: listing.country,
  };
};

async function EditPage({ params }) {
  let listing = await fetchListingByID(params.id);
  // console.log("EDIT PAGE", listing)
  
  const { title, description, image, price, location, country, category } = listing.listing;
  return (
    <Editlistingform
      listingId={params.id}
      title={title}
      description={description}
      image={image}
      price={price}
      location={location}
      country={country}
      category={category}
    />
  );
}

export default EditPage;
