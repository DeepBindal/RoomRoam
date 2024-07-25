"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { deleteListing } from "@/lib/actions/listing.actions";
import toast from "react-hot-toast"
import {  useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

 function EditDeletebuttons({id, ownerId}) {
    const router = useRouter();
    const pathname = usePathname();
    const {data: session} =  useSession();
    const handleDelete = async (id) => {
        let result = await deleteListing(id, pathname);
        if(result === "Deleted successfully"){
            toast.success("Listing deleted!");
            router.push("/")
        }
    }

  return (
    <>
      {session?.user && session?.user.id === ownerId && (
        <div className="mt-5 flex-start gap-4 border-t border-gray-100 pt-3">
          <Link href={`/listing/${id}/edit`}>
            <Button className="red_btn">Edit</Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => handleDelete && handleDelete(id)}
          >
            Delete
          </Button>
        </div>
      )}
    </>
  );
}

export default EditDeletebuttons;
