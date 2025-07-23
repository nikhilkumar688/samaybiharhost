import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";
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

// Helper to truncate title
const getShortTitle = (title) => {
  return (
    title.split(" ").slice(0, 10).join(" ") +
    (title.split(" ").length > 10 ? "..." : "")
  );
};

const DashboardPosts = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const encodedUserId = encodeURIComponent(currentUser._id);
        const res = await fetch(`/api/post/getposts?userId=${encodedUserId}`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) setShowMore(false);
        } else {
          console.error(
            "Failed to fetch posts:",
            data.message || res.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (currentUser?.isAdmin && currentUser?._id) {
      fetchPosts();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const encodedUserId = encodeURIComponent(currentUser._id);
      const res = await fetch(
        `/api/post/getposts?userId=${encodedUserId}&startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-sky-50 to-yellow-100 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 md:p-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Your Posts Dashboard
        </h1>

        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <Table>
              <TableCaption>A list of your published articles.</TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Date Updated</TableHead>
                  <TableHead>Post Image</TableHead>
                  <TableHead>Post Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Delete</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {userPosts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-cover bg-gray-300 rounded"
                        />
                      </Link>
                    </TableCell>

                    <TableCell>
                      <Link to={`/post/${post.slug}`}>
                        {getShortTitle(post.title)}
                      </Link>
                    </TableCell>

                    <TableCell>{post.category}</TableCell>

                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <span
                            onClick={() => setPostIdToDelete(post._id)}
                            className="font-medium text-red-600 hover:underline cursor-pointer"
                          >
                            Delete
                          </span>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600"
                              onClick={handleDeletePost}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>

                    <TableCell>
                      <Link
                        to={`/update-post/${post._id}`}
                        className="font-medium text-green-600 hover:underline cursor-pointer"
                      >
                        <span>Edit</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-blue-700 font-semibold py-6 text-center text-sm"
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <p className="text-center text-gray-700">You have no posts yet!</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPosts;
