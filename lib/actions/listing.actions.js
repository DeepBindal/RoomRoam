"use server";
import { connectToDB } from "../db";
import Listing from "../models/Listing";
import { revalidatePath } from "next/cache";

export async function createListing({
  title,
  description,
  image,
  location,
  country,
  price,
  category,
  userId,
  path,
}) {
  try {
    await connectToDB();


    let newListing = await Listing.create({
      title,
      description,
      location,
      country,
      price,
      category,
      image,
    });
    newListing.owner = userId;
    await newListing.save();
    revalidatePath(path);
    return "savedListing";
  } catch (error) {
    console.log(error);
    // throw new Error("Internal error while creating listing");
  }
}

export async function fetchListings() {
  try {
    await connectToDB();

    const allListings = await Listing.find({});
    return {allListings};
  } catch (error) {
    throw new Error("Failed to fetch listings");
  }
}

export async function fetchListingByID(listingId) {
  try {
    await connectToDB();

    let listing = await Listing.findById(listingId)
      .populate({
        path: "owner",
      })
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      });

    return {listing};
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateListing({
  title,
  description,
  image,
  price,
  location,
  country,
  category,
  path,
  listingId,
}) {
  try {
    await connectToDB();
    let listing = await Listing.findByIdAndUpdate(listingId, {
      title,
      image,
      description,
      location,
      country,
      price,
      category,
    });

    let savedListing = await listing.save();
    revalidatePath(path);

    return "listingUpdated";
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteListing(listingId, path) {
  try {
    await connectToDB();

    await Listing.findByIdAndDelete(listingId);
    revalidatePath(path);
    return "Deleted successfully";
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}
