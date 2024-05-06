"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useUploadThing } from "@/lib/uploadthing";
import { createListing } from "@/lib/actions/listing.actions";
import { Button } from "./ui/button";
import { usePathname, useRouter, redirect } from "next/navigation";
import { isBase64Image } from "@/lib/utils";
import toast from "react-hot-toast";
function Createlistingform({ type }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [files, setFiles] = useState([]);
  const { startUpload } = useUploadThing("media");
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: "",
      location: "",
      country: "",
      category: "",
    },
  });
  const handleImage = (e, fieldChange) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const postListing = async (values) => {
    const blob = values.listing_image;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.listing_image = imgRes[0].fileUrl;
      }
    }
    console.log(values);
    const result = await createListing({
      title: values.title,
      description: values.description,
      image: values.listing_image,
      price: values.price,
      location: values.location,
      country: values.country,
      category: values.category,
      userId: session.user.id,
      path: pathname,
    });

    if (result === "savedListing") {
      toast.success("Listing created Successfully");
      router.push("/")
    }
  };
  return (
    <section className="w-full max-w-full flex justify-center items-center flex-col">
      <div className="flex flex-col justify-start items-center">
        <h1 className="head_text">
          <span className="blue_gradient">{type} Listing</span>
        </h1>
        <p className="desc text-left max-w-full">
          {type} and share amazing stays with the world.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(postListing)}
          className="flex flex-col sm:w-1/2 justify-start gap-10 bg-slate-500 px-10 py-16 rounded-lg mx-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-4">
                <FormLabel className="text-base-semibold text-dark-2">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-4">
                <FormLabel className="text-base-semibold text-dark-2">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing_image"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="listng image"
                      width={196}
                      height={196}
                      priority
                      className="rounded object-contain"
                    />
                  ) : (
                    "Image"
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="upload a photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-4">
                <FormLabel className="text-base-semibold text-dark-3">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-4">
                <FormLabel className="text-base-semibold text-dark-2">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-4">
                <FormLabel className="text-base-semibold text-dark-2">
                  Country
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-4">
                <FormLabel className="text-base-semibold text-dark-2">
                  Category
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
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

export default Createlistingform;
