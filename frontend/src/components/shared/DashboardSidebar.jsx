import { signOutSuccess } from "@/redux/user/userSlice";
import React from "react";
import { TbLayoutDashboard } from "react-icons/tb";
import {
  HiOutlineChatAlt2,
  HiOutlineLogout,
  HiOutlineUsers,
  HiOutlineUserCircle,
  HiOutlinePencilAlt,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
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

  return (
    <aside className="h-full w-64 text-white flex flex-col bg-gradient-to-b from-[#c6edff] via-rose-100 to-[#000a4d] shadow-lg">
      {/* Header */}
      <div className="p-5 flex items-center gap-3 border-b border-[#000a4d]/30 text-3xl font-bold bg-transparent text-[#0004ad] drop-shadow">
        <TbLayoutDashboard className=" text-rose-600 animate-spin-slow text-5xl" />
        <span>Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col justify-between">
        <ul className="space-y-2 text-slate-900">
          {currentUser && currentUser.isAdmin && (
            <li>
              <Link
                to={"/dashboard?tab=dashboard"}
                className="flex items-center p-2 rounded-md transition duration-200 hover:bg-rose-500 hover:text-white group"
              >
                <MdDashboardCustomize className="mr-3 font-semibold transform transition-transform duration-200 group-hover:scale-110 group-hover:animate-bounce text-xl" />
                <span className="transition-transform duration-200 font-semibold group-hover:translate-x-1">
                  Dashboard
                </span>
              </Link>
            </li>
          )}
          <li>
            <Link
              to={"/dashboard?tab=profile"}
              className="flex items-center p-2 rounded-md transition duration-200 hover:bg-rose-500 hover:text-white group"
            >
              <HiOutlineUserCircle className="mr-3 font-semibold transform transition-transform duration-200 group-hover:scale-110 group-hover:animate-bounce text-xl" />
              <span className="transition-transform duration-200 font-semibold group-hover:translate-x-1">
                Profile
              </span>
            </Link>
          </li>

          {currentUser?.isAdmin && (
            <>
              <li>
                <Link
                  to={"/create-post"}
                  className="flex items-center p-2 rounded-md transition duration-200 hover:bg-rose-500 hover:text-white group"
                >
                  <HiOutlinePencilAlt className="mr-3 font-semibold transform transition-transform duration-200 group-hover:scale-110 group-hover:animate-bounce text-xl" />
                  <span className="transition-transform font-semibold duration-200 group-hover:translate-x-1">
                    Create Post
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard?tab=posts"}
                  className="flex items-center p-2 rounded-md transition duration-200 hover:bg-rose-500 hover:text-white group"
                >
                  <HiOutlineDocumentText className="mr-3 font-semibold transform transition-transform duration-200 group-hover:scale-110 group-hover:animate-bounce text-xl" />
                  <span className="transition-transform font-semibold duration-200 group-hover:translate-x-1">
                    Your articles
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard?tab=users"}
                  className="flex items-center p-2 rounded-md transition duration-200 hover:bg-rose-500 hover:text-white group"
                >
                  <HiOutlineUsers className="mr-3 font-semibold transform transition-transform duration-200 group-hover:scale-110 group-hover:animate-bounce text-xl" />
                  <span className="transition-transform font-semibold duration-200 group-hover:translate-x-1">
                    All Users
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard?tab=comments"}
                  className="flex items-center p-2 rounded-md transition duration-200 hover:bg-rose-500 hover:text-white group"
                >
                  <HiOutlineChatAlt2 className="mr-3 font-semibold transform transition-transform duration-200 group-hover:scale-110 group-hover:animate-bounce text-xl" />
                  <span className="transition-transform font-semibold duration-200 group-hover:translate-x-1">
                    All Comments
                  </span>
                </Link>
              </li>
              {/* Logout */}
              <div className="mt-10 border-t border-[#0004ea]/30 pt-4">
                <button
                  onClick={handleSignout}
                  className="flex items-center w-full gap-3 px-4 py-3 text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl shadow-lg hover:from-pink-600 hover:to-rose-500 transition-all duration-300 group"
                >
                  <HiOutlineLogout className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-md font-medium group-hover:tracking-wide transition-all duration-300">
                    Logout
                  </span>
                </button>
              </div>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
