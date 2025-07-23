import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/user/userSlice";
import { uploadFile, getFileView } from "@/lib/appwrite/uploadImage";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const DashboardProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const profilePicRef = useRef();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const uploadImage = async () => {
    if (!imageFile) return currentUser.profilePicture;
    try {
      const uploadedFile = await uploadFile(imageFile);
      const profilePictureUrl = getFileView(uploadedFile.$id);
      return profilePictureUrl;
    } catch (error) {
      toast({ title: "Update user failed. Please try again!" });
      console.error("Image upload failed: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const profilePicture = await uploadImage();
      const updateProfile = { ...formData, profilePicture };
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateProfile),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        toast({ title: "Session expired. Please log in again." });
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        toast({ title: "Update user failed. Please try again!" });
      } else {
        dispatch(updateSuccess(data));
        toast({ title: "User updated successfully!" });
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast({ title: "Update User failed. Please try again!" });
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        toast({ title: "Session expired. Please log in again." });
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      console.error(error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff8f0] via-[#ffe5ec] to-[#d6e6f2] px-4 py-10">
      <div className="w-full max-w-xl p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-blue-300 shadow-[0_0_40px_rgba(0,0,255,0.2)] hover:shadow-[0_0_80px_rgba(0,0,255,0.4)] transition-all duration-500 ease-in-out">
        <h1 className="text-4xl text-center font-extrabold text-green-600 mb-8 tracking-tight drop-shadow-md">
          Edit Your Profile
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={profilePicRef}
            onChange={handleImageChange}
          />

          <div
            onClick={() => profilePicRef.current.click()}
            className="w-32 h-32 mx-auto border-4 border-green-400 rounded-full overflow-hidden shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <img
              src={
                imageFileUrl ||
                currentUser.profilePicture ||
                "/default-avatar.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <Input
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="bg-white/80 border-2 border-cyan-400 text-black font-semibold placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
          />
          <Input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="bg-white/80 border-2 border-cyan-400 text-black font-semibold placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
          />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-white/80 border-2 border-cyan-400 text-black font-semibold placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg hover:opacity-100 opacity-90 transition-all duration-300"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>

        <div className="flex justify-between items-center mt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="text-red-500 hover:bg-rose-500 hover:text-white font-semibold"
              >
                <AiOutlineUserDelete className="font-bold text-2xl" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDeleteUser}
                >
                  Yes, delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="ghost"
            className="text-black hover:bg-rose-500 hover:text-white font-semibold"
            onClick={handleSignout}
          >
            <FiLogOut />
            Sign Out
          </Button>
        </div>

        {error && (
          <p className="text-red-400 text-center mt-4 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardProfile;
