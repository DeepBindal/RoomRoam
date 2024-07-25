import { Schema, model, models } from 'mongoose';
import Review from './Review';
import User from './User';
const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description :String, 
    image : String,
    price : Number,
    location : String, 
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    category: {
        type: [String],
        enum: ['Budget', 'Mid-Range', 'Luxury', 'Pool', 'Farm', 'Beach', 'Fort', 'Camping', 'Arctic', ''],
      },
    owner :
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    // geometry :  {
    //     type: {
    //       type: String, // Don't do `{ location: { type: String } }`
    //       enum: ['Point'], // 'location.type' must be 'Point'
    //       required: true
    //     },
    //     coordinates: {
    //       type: [Number],
    //       required: true
    //     }
    //   }
});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}})
    }
})

const Listing = models.Listing || model("Listing", listingSchema);

export default Listing