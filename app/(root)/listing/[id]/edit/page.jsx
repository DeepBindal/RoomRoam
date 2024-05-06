import React from 'react'
import { fetchListingByID } from "@/lib/actions/listing.actions";
import Editlistingform from '@/components/Editlistingform';
async function EditPage({params}) {

  let listing = await fetchListingByID(params.id);
  const {title, description, image, price, location, country, category} = listing;
  return (
    <Editlistingform listingId={params.id} title={title} description={description} 
    image={image} price={price} location={location} country={country}
    category={category}/>
  )
}

export default EditPage