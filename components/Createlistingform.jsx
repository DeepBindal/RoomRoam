"use client";
import React, { useEffect, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { isBase64Image } from "@/lib/utils";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";

function CreateListingForm({ type }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session === undefined || session === null) {
      router.push("/signin");
    }
  }, []);
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
    try {
      const blob = values.listing_image;
      setLoading(true);

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

      setLoading(false);
      if (result === "savedListing") {
        toast.success("Listing created Successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full rounded-lg shadow-xl max-w-4xl bg--200 mx-auto flex flex-col justify-center items-center mb-8 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            {type} Listing
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          {type} and share amazing stays with the world.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(postListing)}
          className="w-full bg00 shadow-md rounded-lg p-8 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full border border-zinc-950 bg-zinc-800 text-white p-2 rounded-md "
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
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full border border-zinc-950 bg-zinc-800 text-white boder-gray-300 p-2 rounded-md "
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
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="listing image"
                      width={196}
                      height={196}
                      priority
                      className="rounded-md object-cover"
                    />
                  ) : (
                    "Image"
                  )}
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border focus:ring-blue-500 focus:border-blue-500 border-zinc-950 bg-zinc-800 text-white  rounded-md"
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
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full border border-zinc-950 bg-zinc-800 text-white  p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full border border-zinc-950 bg-zinc-800 text-white  p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Country
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full border border-zinc-950 bg-zinc-800 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Category
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full border border-zinc-950 bg-zinc-800 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default CreateListingForm;
