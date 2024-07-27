"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { updateListing } from "@/lib/actions/listing.actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "@nextui-org/react";

function Editlistingform({ listingId, title, description, image, price, location, country, category }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/signin");
  //   }
  // }, [session, router]);

  const [formData, setFormData] = useState({
    title,
    description,
    listing_image: image,
    price,
    location,
    country,
    category,
  });
  // console.log(formData)
  const [files, setFiles] = useState([]);
  const { startUpload } = useUploadThing("media");

  const handleImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles([file]);

      if (!file.type.includes("image")) return;

      fileReader.onload = (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        setFormData((prevData) => ({ ...prevData, listing_image: imageDataUrl }));
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const postListing = async (e) => {
    e.preventDefault();
    setLoading(true)

    const blob = formData.listing_image;
    const hasImageChanged = blob.startsWith("data:image");

    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].fileUrl) {
        formData.listing_image = imgRes[0].fileUrl;
      }
    }

    const result = await updateListing({ ...formData, listingId, path: pathname });

    if (result === "listingUpdated") {
      setLoading(false)
      toast.success("Listing updated successfully");
      router.push(`/listing/${listingId}`);
    }
  };

  return (
    <section className="w-full max-w-full flex justify-center items-center flex-col">
      <form
        onSubmit={postListing}
        className="flex flex-col sm:w-1/2 justify-start gap-10 bg-gray-800 px-10 py-16 rounded-lg mx-4"
      >
        <div className="flex flex-col w-full gap-4">
          <label className="text-base font-semibold text-gray-200">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="account-form_input p-2 no-focus bg-gray-700 text-gray-200"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label className="text-base font-semibold text-gray-200">Description</label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="account-form_input no-focus bg-gray-700 text-gray-200"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="">
            <Image
              src={formData.listing_image || image}
              alt="listing image"
              width={196}
              height={196}
              priority
              className="rounded object-contain"
            />
          </label>
          <Input
            type="file"
            accept="image/*"
            className="account-form_image-input bg-gray-700 text-gray-200"
            onChange={handleImage}
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label className="text-base font-semibold text-gray-200">Price</label>
          <Input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="account-form_input no-focus bg-gray-700 text-gray-200"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label className="text-base font-semibold text-gray-200">Location</label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="account-form_input no-focus bg-gray-700 text-gray-200"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label className="text-base font-semibold text-gray-200">Country</label>
          <Input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="account-form_input no-focus bg-gray-700 text-gray-200"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label className="text-base font-semibold text-gray-200">Category</label>
          <Input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="account-form_input no-focus bg-gray-700 text-gray-200"
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? (<Spinner />) : ("Submit")}
        </Button>
      </form>
    </section>
  );
}

export default Editlistingform;
