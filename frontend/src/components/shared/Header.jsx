import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutSuccess } from "@/redux/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const formattedDate = time.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="shadow-md sticky top-0 bg-[#c6edff] z-50">
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto px-4 py-3 gap-4">
        {/* Logo */}
        <div className="flex items-center hover:animate-pulse">
          <Link to="/" className="flex items-center px-0">
            <img
              src="/logo.svg"
              alt="SamayBihar Logo"
              className="h-10 sm:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Clock */}
        <div className="text-sm sm:text-base text-slate-700 text-center font-semibold font-medium hidden sm:block">
          <p className="text-orange-600">{formattedDate}</p>
          <p className="text-green-700">{formattedTime}</p>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <form
            className="p-3 bg-slate-100 rounded-lg flex items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none bg-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="hover:animate-bounce">
              <FaSearch className="text-slate-600" />
            </button>
          </form>
        </div>

        {/* Navigation Links and Sign In */}
        <div className="flex items-center gap-4">
          <ul className="hidden lg:flex items-center gap-4 text-slate-700 font-medium">
            <li className="hover:text-white hover:bg-rose-500 hover:rounded-md hover:p-1 hover:shadow-md">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white hover:bg-rose-500 hover:rounded-md hover:shadow-md hover:p-1">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-white hover:bg-rose-500 hover:rounded-md hover:shadow-md hover:p-1">
              <Link to="/news">News Article</Link>
            </li>
          </ul>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <img
                    src={currentUser.profilePicture}
                    alt="User"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-60 bg-[#c6edff] shadow-md">
                <DropdownMenuLabel className="font-bold">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-400" />

                <DropdownMenuItem>
                  <div className="flex flex-col mt-2 gap-1 shadow-md bg-[#000e4a] text-[#ff8572] rounded-sm w-full px-3 py-2">
                    <span>@{currentUser.username}</span>
                    <span className="text-green-400">@{currentUser.email}</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard?tab=profile"
                    className="w-full px-3 py-2 text-left font-semibold hover:bg-rose-500 rounded-sm"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left font-semibold px-3 py-2 hover:bg-rose-500 rounded-sm"
                  >
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">
              <Button className="px-4 py-2 shadow-md hover:shadow-md bg-rose-800 hover:bg-rose-500 font-semibold">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
