import Advertise from "@/components/shared/Advertise";
import CommentSection from "@/components/shared/CommentSection";
import ToppostAdvertise from "@/components/shared/Toppostadvertise";
import PostCard from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentArticles, setRecentArticles] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getPosts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentArticles(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-100 via-white to-yellow-100">
        <img
          src="https://cdn-icons-png.flaticon.com/128/39/39979.png"
          alt="Loading"
          className="w-20 animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-white to-yellow-100">
      <main className="p-4 flex flex-col max-w-6xl mx-auto animate-fadeIn">
        {/* Title */}
        <h1 className="text-4xl mt-10 px-4 py-6 text-center font-bold max-w-3xl mx-auto text-slate-800 leading-relaxed break-words transition-all duration-300 underline underline-offset-8 decoration-rose-700 hover:text-rose-800">
          {post?.title}
        </h1>

        {/* Category Button */}
        <Link
          to={`/search?category=${post?.category}`}
          className="self-center mt-3"
        >
          <Button
            variant="outline"
            className="border border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white rounded-full px-5 transition-all duration-300"
          >
            {post?.category}
          </Button>
        </Link>

        {/* Post Image */}
        <img
          src={post?.image}
          alt={post?.title}
          className="mt-10 rounded-xl shadow-xl w-full max-h-[800px] object-cover border-4 border-rose-300 transition-transform duration-500 hover:scale-[1.02]"
        />

        {/* Meta Info */}
        <div className="flex mt-4 justify-between p-3 mx-auto w-full max-w-2xl text-sm text-slate-600 font-medium">
          <span className="bg-yellow-100 px-3 py-1 rounded-full shadow text-yellow-700">
            {post && new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="italic text-pink-600">
            {post && Math.max(1, Math.floor(post.content.length / 800))} min
            read
          </span>
        </div>

        <Separator className="bg-slate-300 my-4" />

        {/* Post Content */}
        <div
          className="p-4 max-w-3xl mx-auto w-full post-content animate-fadeIn text-[17px] leading-8 text-slate-800"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />

        {/* Middle Advert */}
        <div className="max-w-4xl mx-auto w-full mt-16 animate-fadeIn">
          <Advertise />
        </div>

        {/* Comments */}
        <div className="mt-10 animate-fadeIn">
          <CommentSection postId={post._id} />
        </div>

        {/* Recent Articles */}
        <div className="flex flex-col justify-center items-center mb-10 animate-fadeIn">
          <h2 className="text-2xl font-semibold mt-10 text-slate-700 underline decoration-rose-400 underline-offset-4">
            Recently Published Articles
          </h2>
          <div className="flex flex-wrap gap-6 mt-6 justify-center">
            {recentArticles &&
              recentArticles.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>
        </div>

        {/* Bottom Advert */}
        <div className="max-w-4xl mx-auto w-full mt-10 animate-fadeIn">
          <ToppostAdvertise />
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
