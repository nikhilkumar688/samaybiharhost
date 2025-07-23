import React from "react";

const ToppostAdvertise = () => {
  return (
    <div className="relative p-6 bg-gradient-to-r from-yellow-50 via-orange-100 to-rose-200 border-2 border-orange-500 rounded-tl-3xl rounded-br-3xl shadow-lg overflow-hidden">
      {/* Decorative Corner */}
      <div className=" absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-xl text-sm font-bold">
        ADVERTISE
      </div>
      <div className="absolute bottom-0 left-0 bg-red-500 text-yellow-200 px-3 py-1 rounded-tr-xl text-sm font-bold">
        Sponsored
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700">
            Want to run your{" "}
            <span className="text-red-600 underline decoration-wavy">
              ADVERTISEMENT
            </span>{" "}
            here?
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            Reach thousands of readers daily with a custom ad spot.
          </p>
        </div>

        {/* Placeholder for Image or CTA */}
        <div className="w-full md:w-auto">
          <button className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300">
            <a href="https://forms.gle/SFLUXbiuYyD1JV5Y9">Book Now</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToppostAdvertise;
