import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Advertise from "@/components/shared/Advertise";
import PostCard from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ToppostAdvertise from "@/components/shared/Toppostadvertise";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts?limit=6");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#cafbff] via-sky-50 via-rose-50 via-indigo-50 to-blue-100 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-10 md:p-28 max-w-6xl mx-auto animate-fade-in ">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0004ed] via-gray-400 to-orange-500 text-transparent bg-clip-text transition-all duration-700 text-center leading-relaxed pt-4">
          आपका स्वागत है!{" "}
          <span className="text-orange-600">
            <span className="text-black font-extralight">-</span> समय
          </span>
          <span className="text-green-500"> बिहार</span>
        </h1>

        <p className="text-gray-800 mt-3 text-lg leading-relaxed text-center">
          हम लाते हैं देश-दुनिया की सबसे तेज़ और सटीक खबरें – राजनीति, खेल,
          मनोरंजन, अर्थव्यवस्था, तकनीक, और समाज से जुड़ी हर महत्वपूर्ण जानकारी।
        </p>

        <p className="text-gray-800 text-lg leading-relaxed text-center">
          हमारा उद्देश्य है आपको हर खबर से जोड़े रखना और बिना किसी भटकाव के,
          सिर्फ तथ्य आधारित सूचना देना। हमारे साथ आप रहेंगे हर घटनाक्रम से
          अपडेट।
        </p>

        <p className="text-gray-500 italic text-center">
          ताज़ा और प्रमाणिक खबरों का भरोसेमंद स्रोत।
        </p>

        <div className="text-center">
          <Link to={"/search"}>
            <Button className="bg-gradient-to-r from-[#0004ed] via-black to-[#0004ed] hover:from-rose-700 hover:to-red-600 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-fit mx-auto">
              सभी खबरें देखें <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="pb-16 animate-fade-in-up">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-indigo-800 tracking-tight">
            क्यों चुनें{" "}
            <span className="text-pink-600">
              <span className="text-orange-600">समय</span>{" "}
              <span className="text-green-500">बिहार</span>
              <span className="ml-6 text-5xl">{"?"}</span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <FeatureCard
              title={"तेज़ अपडेट"}
              description={
                "हर मिनट बदलती खबरों पर हमारी पैनी नज़र – ब्रेकिंग न्यूज़, लाइव अपडेट्स और विश्वसनीय सूचनाओं के लिए समय बिहार सबसे आगे।"
              }
              icon="⚡"
              bgColor="from-amber-100 to-yellow-50"
            />
            <FeatureCard
              title={"विश्वसनीयता"}
              description={
                "हम बिना किसी पक्षपात के सटीक और सत्यापित समाचार देने में विश्वास करते हैं। आपकी जानकारी ही हमारी प्राथमिकता है।"
              }
              icon="✅"
              bgColor="from-emerald-100 to-lime-50"
            />
            <FeatureCard
              title={"आपकी आवाज़"}
              description={
                "समाज की सच्ची तस्वीर पेश करने और आपकी बात को मंच देने के लिए हम प्रतिबद्ध हैं। जन-समस्याओं को प्रमुखता देना हमारी पहचान है।"
              }
              icon="🗣️"
              bgColor="from-sky-300 to-blue-100"
            />
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <div className="p-3 bg-white">
        <Advertise />
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 animate-fade-in-up">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-indigo-700 border-b pb-2 w-fit border-indigo-300">
              ताज़ा खबरें
            </h2>

            <div className="flex flex-wrap gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={"/search"}
              className="text-lg text-purple-600 hover:underline text-center font-semibold"
            >
              और खबरें देखें
            </Link>
          </div>
        )}
      </div>

      {/* Advertisement Section */}
      <div className="p-3 bg-white">
        <ToppostAdvertise />
      </div>
    </div>
  );
};

// FeatureCard Subcomponent
const FeatureCard = ({ title, description, icon, bgColor }) => {
  return (
    <div
      className={`p-6 bg-gradient-to-br ${bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 hover:scale-105 text-center`}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
