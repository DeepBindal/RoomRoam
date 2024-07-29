"use client";
import React from "react";
import ReviewForm from "./ReviewForm";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteListing } from "@/lib/actions/listing.actions";
import toast from "react-hot-toast";

function ShowListing({ id, ownerId, reviews }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const handleListingDelete = async (id) => {
    let result = await deleteListing(id, pathname);
    if (result === "Deleted successfully") {
      toast.success("Listing deleted!");
      router.push("/home");
    }
  };
  return (
    <>
      {session?.user && session?.user.id === ownerId && (
        <div className="mt-5 flex-start gap-4 border-t border-gray-100 pt-3">
          <Link href={`/listing/${id}/edit`}>
            <Button className="red_btn">Edit</Button>
          </Link>
          <Button variant="destructive" onClick={() => handleListingDelete(id)}>
            Delete
          </Button>
        </div>
      )}

      {session?.user && <ReviewForm listingId={id} ownerId={ownerId} />}

    </>
  );
}

export default ShowListing;
