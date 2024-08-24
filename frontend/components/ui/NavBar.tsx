import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logout from "../LogoutButton";
import { auth } from "@/auth";
import { UserCheck } from "lucide-react";

const NavBar = async () => {
  const session = await auth();

  return (
    <header className=" py-4 bg-transparent">
      <div className="mx-auto w-full px-5 sm:px-10 md:px-12 lg:px-5">
        <nav className="w-full flex justify-between relative">
          {/* <!-- logo --> */}
          <div className="inline-flex relative items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 overflow-hidden rounded-full">
                <Image
                  src="/logo2.webp"
                  width={48}
                  height={48}
                  alt="Logo"
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-semibold text-gray-50">
                Movie Recommender
              </span>
            </Link>
          </div>

          {/* <!-- Menu Items --> */}
          <div className="flex items-center gap-x-4">
            <Link href="/" className="text-gray-50 hover:text-blue-600">
              Home
            </Link>
            <Link href="/movies" className="text-gray-50 hover:text-blue-600">
              Movies
            </Link>
            <Link href="#" className="text-gray-50 hover:text-blue-600">
              TV Shows
            </Link>
            <Link href="#" className="text-gray-50 hover:text-blue-600">
              Suggest
            </Link>
          </div>

          {/* <!-- Auth Buttons --> */}
          <div>
            {session?.user ? (
              <div className="flex text-white items-center space-x-5">
                <Link href={"/dashboard"}>
                  <UserCheck />
                </Link>
                <Logout />
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-[#172554] text-white font-semibold"
              >
                Login
              </Link>
            )}
          </div>

          {/* <!-- Mobile Menu Toggle --> */}
          <button
            className="lg:hidden outline-none w-7 h-auto"
            aria-label="Toggle Navigation"
          >
            {/* Icon bars here */}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
