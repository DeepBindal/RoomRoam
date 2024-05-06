import {z} from 'zod';

export const listingSchema = z.object({
  review: z.string({
    required_error: "Review is required",
    invalid_type_error: "Review must be a string",
  }).min(5, "Review must be atleast 5 Characters long"),
});
