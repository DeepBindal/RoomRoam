import {z} from 'zod';

export const listingSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must not contain Numbers",
  }).min(3, "Title must be at least 3 characters long"),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }).min(10, "Description must be atleast 10 Characters long"),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }).min({0: "Price must be greater than 0"}),
  location: z.string({required_error: "Location is required"}),
  country: z.string({required_error: "Country is required"}),
});
