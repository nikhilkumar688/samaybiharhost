import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const getAnalyticsSummary = async (req, res) => {
  try {
    const getMonthlyData = async (Model, dateField = "createdAt") => {
      const now = new Date();
      const start = new Date(now.setMonth(now.getMonth() - 5));

      const aggregation = await Model.aggregate([
        {
          $match: {
            [dateField]: { $gte: start },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: `$${dateField}` } },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      const last6Months = [...Array(6)]
        .map((_, i) => {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          return d.toISOString().slice(0, 7); // YYYY-MM
        })
        .reverse();

      const map = new Map(aggregation.map((item) => [item._id, item.count]));

      return last6Months.map((month) => ({
        month,
        count: map.get(month) || 0,
      }));
    };

    const users = await getMonthlyData(User);
    const posts = await getMonthlyData(Post);
    const comments = await getMonthlyData(Comment);

    res.status(200).json({ users, posts, comments });
  } catch (err) {
    console.error("Analytics error", err);
    res.status(500).json({ message: "Analytics fetch failed" });
  }
};
