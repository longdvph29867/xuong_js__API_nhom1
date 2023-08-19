import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signInValid, signUpValid } from "../validations/user.js";
dotenv.config();
const {SECRET_CODE} = process.env

export const signUp = async (req, res) => {
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

export const signIn = async (req, res) => {
  try {
    // validate
    const { error } = signInValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // kiểm tra email đã tồn tại hay chưa
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Email này chưa được đăng ký!",
      });
    }

    //b3 find user theo email
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password không đúng!",
      });
    }

    //b5 tao jwt
    const accessToken = await jwt.sign({_id: user.id}, SECRET_CODE, {expiresIn: "1d"})

    //b6 thong bao thanh cong
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhap thành công!",
      user,
      accessToken
    });
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: "Lỗi trong quá trình lấy dữ liệu",
    });
  }
};