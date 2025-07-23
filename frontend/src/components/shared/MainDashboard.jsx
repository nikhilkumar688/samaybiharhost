import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardCard from "./DashboardCard";
import { convertToReadableFormat } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MainDashboard = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState({
    users: [],
    posts: [],
    comments: [],
  });

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics/summary", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Error fetching analytics", error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
      fetchAnalytics();
    }
  }, [currentUser]);

  const chartData = analytics.users.map((u, i) => ({
    name: u.month,
    Users: u.count,
    Posts: analytics.posts[i]?.count || 0,
    Comments: analytics.comments[i]?.count || 0,
  }));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-rose-50 to-indigo-100 p-4 md:p-10">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
        <DashboardCard
          title="All Users"
          description={`${convertToReadableFormat(
            currentUser.createdAt
          )} - ${convertToReadableFormat(Date.now())}`}
          chartData={[{ value: totalUsers, fill: "blue" }]}
          chartConfig={{ users: { label: "Users" } }}
          totalValue={totalUsers}
          lastMonthValue={lastMonthUsers}
          footerText="Total users for all time"
          endAngle={250}
        />
        <DashboardCard
          title="All Comments"
          description={`${convertToReadableFormat(
            currentUser.createdAt
          )} - ${convertToReadableFormat(Date.now())}`}
          chartData={[{ value: totalComments, fill: "orange" }]}
          chartConfig={{ users: { label: "Comments" } }}
          totalValue={totalComments}
          lastMonthValue={lastMonthComments}
          footerText="Total comments for all time"
          endAngle={160}
        />
        <DashboardCard
          title="All Posts"
          description={`${convertToReadableFormat(
            currentUser.createdAt
          )} - ${convertToReadableFormat(Date.now())}`}
          chartData={[{ value: totalPosts, fill: "green" }]}
          chartConfig={{ users: { label: "Posts" } }}
          totalValue={totalPosts}
          lastMonthValue={lastMonthPosts}
          footerText="Total posts for all time"
          endAngle={110}
        />
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Monthly User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Users"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Posts vs Comments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Posts" fill="#10b981" />
              <Bar dataKey="Comments" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Recent Users</h2>
            <Button variant="outline">
              <Link to="/dashboard?tab=users">See all</Link>
            </Button>
          </div>
          <Table>
            <TableCaption>Most recent registered users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Comments Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Recent Comments
            </h2>
            <Button variant="outline">
              <Link to="/dashboard?tab=comments">See all</Link>
            </Button>
          </div>
          <Table>
            <TableCaption>Latest comments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
                <TableHead>Likes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell className="line-clamp-2 max-w-[220px]">
                    {comment.content}
                  </TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Posts Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Recent Posts</h2>
            <Button variant="outline">
              <Link to="/dashboard?tab=posts">See all</Link>
            </Button>
          </div>
          <Table>
            <TableCaption>Most recent posts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="line-clamp-1 max-w-[180px]">
                    {post.title}
                  </TableCell>
                  <TableCell className="capitalize">{post.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
