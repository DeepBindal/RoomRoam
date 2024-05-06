"use server";

import { connectToDB } from "../db";
import Listing from "../models/Listing";
import Review from "../models/Review";
import { revalidatePath } from "next/cache";

export const postReview = async ({
  rating,
  userId,
  comment,
  listingId,
  path,
}) => {
  try {
    await connectToDB();
    let newReview = new Review({
      comment,
      rating,
    });

    newReview.author = userId;
    console.log(newReview);
    let listing = await Listing.findById(listingId);
    listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    revalidatePath(path);
    return "Reviewcreatedsuccessfully";
  } catch (error) {
    return "Error while creating review";
  }
};

export const deleteReview = async ({listingId, reviewId, path}) => {
  try {
    await connectToDB();
    await Listing.findByIdAndUpdate(listingId, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    revalidatePath(path);
    return "Reviewdeletedsuccessfully";
  } catch (error) {
    return "Errordeletingreview";
  }
};
