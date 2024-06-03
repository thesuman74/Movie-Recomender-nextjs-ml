import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* <!-- hero section --> */}
      <section
        className="relative py-32 lg:py-36 bg-gray-900 "
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(/bg.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
            <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
            <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span>
          </div>
          <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
          <div
            className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
          >
            {/* <h1
              className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-gray-100"
            >
              The Only{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 from-20% via-yellow-400 via-80% to-white">
                Movie Recomender
              </span>
              That You Will Ever Need.
            </h1> */}
            <p className="-mb-8 mt-8 text-gray-50">
              Find perfect match to your mood
            </p>
            <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
              <div className="flex sm:flex-row flex-col gap-5 w-full">
                <form
                  action="#"
                  className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-gray-600 shadow-lg shadow-gray-200/20
                            border border-gray-200 bg-gray-100 rounded-full ease-linear focus-within:bg-white  focus-within:border-blue-600"
                >
                  <span className="min-w-max pr-2 border-r border-gray-200"></span>
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Enter a movie title, actor, keyword.."
                    className="w-full py-3 outline-none bg-transparent"
                  />
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-search pr-2 border-r w-8 h-8"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>{" "}
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-2 flex space-x-4 items-center">
              {/* brain svg  */}
              <Image
                src="/brain.png"
                alt=""
                className="w-[150px] h-full object-cover   "
              />

              <div className="flex flex-col -mx-10">
                <p className="text-3xl font-bold">Deep Learning Inside</p>

                <p>
                  We determine recommendations using cutting-edge Machine
                  Learning Technologies. Wanna know how ?
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
            <h1
              className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-gray-100"
            >
              The Only{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 from-20% via-yellow-400 via-80% to-white">
                Movie Recomender
              </span>
              That You Will Ever Need.
            </h1>
            {/* <Image
              src="/poster14.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
              quality={100}
              className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
            /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
