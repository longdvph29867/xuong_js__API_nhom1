// import slugify from "slugify";
import User from "../models/User.js";

export const getAll = async (req, res) => {
  try {
    const data = await User.find();
    if (!data && data.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy category",
      });
    }
    return res.status(200).json({
      message: "Lấy thành công!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi trong quá trình lấy dữ liệu",
    });
  }
};