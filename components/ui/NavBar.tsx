import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <div>
      {/* <!-- navbar --> */}
      <header className="absolute inset-x-0 top-0 z-50 py-6">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
          <nav className="w-full flex justify-between gap-6 relative">
            {/* <!-- logo --> */}
            <div className="min-w-max inline-flex relative">
              <a href="/" className="relative flex items-center gap-3">
                <div className=" w-12 h-12 overflow-hidden   rounded-full">
                  <img
                    src="/logo2.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {/* <Image
                    src="/logo,jpg"
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  /> */}
                </div>
                <div className="inline-flex text-lg font-semibold text-gray-50">
                  Movie Recomender
                </div>
              </a>
            </div>

            <div
              data-nav-overlay
              aria-hidden="true"
              className="fixed hidden inset-0 lg:!hidden bg-gray-800/60 bg-opacity-50 backdrop-filter backdrop-blur-xl"
            ></div>
            <div
              data-navbar
              className="flex invisible opacity-0  translate-y-10 overflow-hidden lg:visible lg:opacity-100  lg:-translate-y-0 lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-white lg:!bg-transparent border-x border-x-gray-100 lg:border-x-0"
            >
              <ul className="border-t border-gray-100  lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-gray-50 w-full lg:justify-center lg:items-center">
                <li>
                  <a
                    href="#"
                    className="duration-300 font-medium ease-linear hover:text-blue-600 py-3"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="duration-300 font-medium ease-linear hover:text-blue-600 py-3"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="duration-300 font-medium ease-linear hover:text-blue-600 py-3"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="duration-300 font-medium ease-linear hover:text-blue-600 py-3"
                  >
                    Features
                  </a>
                </li>
              </ul>

              <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-gray-100   lg:border-0 px-6 lg:px-0">
                <a
                  href="#"
                  className="flex justify-center items-center w-full sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                    after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-100 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554]"
                >
                  <span className="relative z-10 text-white">Get Started</span>
                </a>
              </div>
            </div>

            <div className="min-w-max flex items-center gap-x-3">
              <button
                data-toggle-navbar
                data-is-open="false"
                className="lg:hidden lg:invisible outline-none w-7 h-auto flex flex-col relative"
              >
                <span
                  id="line-1"
                  className="w-6 h-0.5 rounded-full bg-gray-700 transition-all duration-300 ease-linear"
                ></span>
                <span
                  id="line-2"
                  className="w-6 origin-center  mt-1 h-0.5 rounded-ful bg-gray-700 transition-all duration-300 ease-linear"
                ></span>
                <span
                  id="line-3"
                  className="w-6 mt-1 h-0.5 rounded-ful bg-gray-700 transition-all duration-300 ease-linear"
                ></span>
                <span className="sr-only">togglenav</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
