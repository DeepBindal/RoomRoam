import { Schema, model, models } from 'mongoose';
import User from './User';
const reviewSchema = new Schema({
    comment : String,
    rating : 
    {
        type : Number,
        min : 1,
        max : 5
    },
    createAt : {
        type : Date,
        default : Date.now()
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Review = models?.Review || model("Review", reviewSchema);

export default Review;