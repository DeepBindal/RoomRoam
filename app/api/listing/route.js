import { connectToDB } from "@/lib/db";
import Listing from "@/lib/models/Listing";

export const GET = async (req, res) => {
    try {
        await connectToDB();
        const allListings = await Listing.find({});
        const plainListings = allListings.map(listing => listing.toObject());
        return new Response(JSON.stringify(plainListings), {status: 200})
      } catch (error) {
        console.log(error)
        // throw new Error("Failed to fetch listings");
      }
}