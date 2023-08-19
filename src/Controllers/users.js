// import slugify from "slugify";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { signUpValid } from "../validations/user.js";

export const getAll = async (req, res) => {
  try {
    const data = await User.find();
    if (!data && data.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy user",
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

export const getDetail = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    console.log("🚀 ~ file: users.js:26 ~ getDetail ~ req.params.id:", req.params.id)
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục!",
      });
    }
    return res.status(200).json({
      message: "Lấy thành công 1 danh mục!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      name: error.message,
      message: "Lỗi trong quá trình lấy dữ liệu",
    });
  }
};

export const create = async (req, res) => {
  try {
    //b1 validate
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // kiểm tra username tồn tại
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      return res.status(400).json({
        message: "Tên đăng nhập này đã được đăng ký!",
      });
    }
    
    // kiểm tra email tồn tại
    const userExistsEmail = await User.findOne({ email: req.body.email });
    if (userExistsEmail) {
      return res.status(400).json({
        message: "Email này đã được đăng ký!",
      });
    }

    // Mã hoá password
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    // Khởi tạo user trong db
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // thông báo thành công
    //xoá mật khẩu
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng ký thành công!",
      user,
    });

  } catch (error) {
    res.status(500).json({
      name: error.name,
      names: error.message,
      message: "Lỗi trong quá trình lấy dữ liệu",
    });
  }
};

export const update = async (req, res) => {
  try {
    //b1 validate
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // kiểm tra username tồn tại
    const userExists = await User.findOne({ username: req.body.username, _id: { $ne: req.params.id }});
    if (userExists) {
      return res.status(400).json({
        message: "Tên đăng nhập này đã được đăng ký!",
      });
    }
    
    // kiểm tra email tồn tại
    const userExistsEmail = await User.findOne({ email: req.body.email, _id: { $ne: req.params.id }});
    if (userExistsEmail) {
      return res.status(400).json({
        message: "Email này đã được đăng ký!",
      });
    }

    // Mã hoá password
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    // Khởi tạo user trong db
    const data = {
      ...req.body,
      password: hashedPassword
    }

    // kiểm tra đã tồn tại chưa
    const category = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    if(!category) {
      return res.status(404).json({
        message: 'Cập nhật người dùng thất bại'
      })
    }
    
    return res.status(200).json({
      message: "Cập nhật người dùng thành công",
      data: category,
    });

  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    if(!data) {
      return res.status(400).json({
        message: 'Xoa thất bại',
      })
    }
    return res.status(200).json({
      message: "Xoá thành công",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};