import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const PostCard = ({ post }) => {
  return (
    <div className="bg-gradient-to-tr from-[#fdfcfb] to-[#e2d1c3] hover:shadow-xl shadow-md rounded-2xl w-full sm:w-[340px] overflow-hidden transition-transform duration-300 border border-gray-300 hover:-translate-y-1">
      {/* Post Image */}
      <Link
        to={`/post/${post.slug}`}
        className="block h-[220px] overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </Link>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Post Title */}
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 hover:text-rose-600 transition-colors duration-300">
          {post.title}
        </h3>

        {/* Post Category */}
        <span className="inline-block text-sm font-medium text-white bg-rose-400 px-3 py-1 rounded-full w-max">
          {post.category}
        </span>

        {/* Divider */}
        <div className="border-t border-gray-300 my-2" />

        {/* Read More Button */}
        <Link
          to={`/post/${post.slug}`}
          className="group flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:from-red-500 hover:to-pink-500 transition-all duration-300"
        >
          <span>Read Article</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
