"use client";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { deleteReview } from "@/lib/actions/review.actions";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
function ReviewCard({
  reviewId,
  comment,
  rating,
  username,
  image,
  date,
  listingId,
  authorId,
}) {
  const { data: session } = useSession();
  // const session = await getServerSession(authOptions);
  const pathname = usePathname();

  return (
    <Card className="max-w-[400px] bg-zinc-800 text-slate-100"> 
      <CardHeader className="flex justify-between gap-3">
        <div className="flex flex-center">
          <Image
            alt="profile"
            height={40}
            radius="sm"
            src={image || "/assets/user.svg"}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{username}</p>
            <p className="text-small">{date}</p>
          </div>
        </div>
        <div className="flex text-lg">
          {rating}
          <Image
            alt="star"
            height={24}
            className="mx-1"
            radius="sm"
            src="/assets/star.svg"
            width={24}
          />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{comment}</p>
        <>
          {session?.user.id === authorId && (
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p
                className="font-inter text-sm orange_gradient cursor-pointer"
                onClick={() =>
                  deleteReview({ listingId, reviewId, path: pathname })
                }
              >
                Delete
              </p>
            </div>
          )}
        </>
      </CardBody>
      <Divider />
    </Card>

    // <div className="prompt_card border  bg-slate-100 shadow-md  ">
    //   <div className="flex justify-between items-start gap-5">
    //     <div className="flex flex-center">
    //       <Image
    //         alt="profile"
    //         height={40}
    //         radius="sm"
    //         src={image || "/assets/user.svg"}
    //         width={40}
    //       />
    //       <div className="flex flex-col">
    //         <p className="text-md">{username}</p>
    //         <p className="text-small text-default-500">{date}</p>
    //       </div>
    //     </div>
    //     <div className="flex text-lg">
    //       {rating}
    //       <Image
    //         alt="star"
    //         height={24}
    //         className="mx-1"
    //         radius="sm"
    //         src="/assets/star.svg"
    //         width={24}
    //       />
    //     </div>
    //   </div>

    //   <p className="my-4 font-satoshi text-sm text-gray-700">{comment}</p>

    //   {session?.user.id === authorId && (
    //     <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
    //       <p
    //         className="font-inter text-sm orange_gradient cursor-pointer"
    //         onClick={() =>
    //           deleteReview({ listingId, reviewId, path: pathname })
    //         }
    //       >
    //         Delete
    //       </p>
    //     </div>
    //   )}
    // </div>
  );
}

export default ReviewCard;
