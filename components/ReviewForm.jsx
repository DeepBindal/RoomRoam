"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { Slider } from "./ui/slider";

import { useForm } from "react-hook-form";

import { postReview } from "@/lib/actions/review.actions";
import toast from "react-hot-toast";

export default function ReviewForm({ listingId }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const defaultValues = {
    review: "",
    rating: "",
  };
  const form = useForm({
    defaultValues,
  });

  const submitReview = async (values) => {
    const result = await postReview({
      rating: values.rating,
      comment: values.review,
      userId: session?.user.id,
      listingId,
      path: pathname,
    });
    if (result === "Reviewcreatedsuccessfully") {
      form.reset({defaultValues});
      toast.success("Review created!");
    }
  };

  return (
    <section className="w-[100%]">
      <p className="text-start head_text my-8">Leave a review!</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitReview)}
          className="flex flex-col justify-start gap-10 bg-white px-10 py-16 rounded-lg mx-4"
        >
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-4">
                <FormLabel className="text-base-semibold text-dark-2">
                  Review
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="border border-dark-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Rating - {value}</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={5}
                    step={1}
                    defaultValue={[value]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
