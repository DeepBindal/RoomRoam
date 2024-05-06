"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function NavBar() {
  const { data: session } = useSession();

  const [toggleDrop, setToggleDrop] = useState(false);

  return (
    <nav className="flex-between items-center w-full mb-10 pt-3 p-4">
      <Link href="/" className="flex-center flex gap-4">
        <Image
          src="/assets/logo.svg"
          width={30}
          height={30}
          alt="Logo"
          className="object-contain"
        />
        <p className="logo_text">RoomRoam</p>
      </Link>

      {/* Desktop Navigation  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-listing" className="black_btn">
              Post Listing
              <Image
                src="/assets/create.svg"
                width={20}
                height={20}
                alt="Logo"
                className=" ml-1 object-contain"
              />
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image || `/assets/user.svg`}
                className="rounded-full"
                width={37}
                alt="profile-pic"
                height={37}
                onClick={() => {
                  setToggleDrop((prev) => !prev);
                }}
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              className="black_btn"
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </button>
            <Link href="/signup" className="black_btn">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image || `/assets/user.svg`}
              className="rounded-full"
              width={37}
              alt="profile-pic"
              height={37}
              onClick={() => {
                setToggleDrop((prev) => !prev);
              }}
            />
            {toggleDrop && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDrop(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-listing"
                  className="dropdown_link"
                  onClick={() => setToggleDrop(false)}
                >
                  Post Listing
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDrop(false);
                    signOut();
                  }}
                  className="mt-5 black_btn w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {
              <button
                type="button"
                className="black_btn"
                onClick={() => {
                  signIn();
                }}
              >
                Sign In
              </button>
            }
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
