import Order from "../models/order.model";
import User from "../models/user.model";
import Product from "../models/product.model";
export const getAnalytics = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalRenvenue: { $sum: "$totalAmount" },
      },
    },
  ]);
  const { totalSales, totalRenvenue } = salesData[0] || {
    totalSales: 0,
    totalRenvenue: 0,
  };
  return res.json({
    totalUsers,
    totalOrders,
    totalProducts,
    totalSales,
    totalRenvenue,
  });
};
export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);
    const dates = getDatesInRange(startDate, endDate);
    return dates.map((date) => {
      const foundData = dailySalesData.find((data) => data._id === date);
      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
      throw new Error(error.message);
  }
};
function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const dates = [];
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}
