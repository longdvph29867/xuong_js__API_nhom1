import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const {SECRET_CODE} = process.env

export const checkPremission =  async (req, res, next) => {
    try {
        // b1 kiểm tra đã đăng nhập hay chưa
        const token = req.headers.authorization?.split(' ')[1];
        // b2 kiểm tra token
        if(!token) {
            return res.status(403).json({
                message: 'Bạn chưa đăng nhập!'
            })
        }
        // b3 kiểm tra quyền người dùng
        const decoded = jwt.verify(token, SECRET_CODE);
        const user = await User.findById(decoded._id);
        if(!user) {
            return res.status(403).json({
                message: 'Token lỗi hoặc hết hạn!'
            })
        }
        if(user.role !== 'admin') {
            return res.status(400).json({
                message: 'Bạn không có quyền làm thao tác này!'
            })
        }
        // b4 next
        next();

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}