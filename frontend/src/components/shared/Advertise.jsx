import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const Advertise = () => {
  return (
    <div className="flex flex-col md:flex-row p-3 border border-orange-600 justify-center items-center rounded-tr-3xl  rounded-bl-3xl text-center">
      <div className="flex-1 justify-center flex flex-col p-3 w-full md:w-3/5">
        <h2 className="text-2xl font-semibold text-wrap">
          Want to know about today's{" "}
          <span className="text-[#0003ea]">TOP 10*</span>
          <span className="text-red-500 text-3xl font-bold"></span> news ...?
        </h2>
        <p className="text-gray-500 my-2">Checkout these top news !</p>
        <Button className="bg-[#00bb5a] border-rose-700 border-2 text-[#e7ff13] hover:text-white hover:bg-rose-500 text-md mt-2 px-4 py-2 h-min w-full text-center transition-colors duration-300">
          <Link
            to={"https://www.tv9hindi.com/author/bhagalpur-shivam"}
            target="_blank"
            rel="noopener norefferer"
            className="text-wrap hover:text-white "
          >
            Stay Updated With Daily News from shivam
          </Link>
        </Button>
      </div>
      <div className="p-7 w-full md:w-2/5">
        <img
          src="https://media.istockphoto.com/id/1219980553/photo/online-news-on-a-smartphone-and-laptop-woman-reading-news-or-articles-in-a-mobile-phone.jpg?b=1&s=612x612&w=0&k=20&c=6lR1CyHtjy33r4EC9IZZQnC-o1xGw3F70qmRoiaSESg="
          alt=""
          className="w-full"
        />
      </div>
    </div>
  );
};
export default Advertise;
