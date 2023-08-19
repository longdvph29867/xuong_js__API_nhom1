// import slugify from "slugify";
import Products from "../models/products.js";
import { productValid } from "../validations/products.js";

export const getAll = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products && products.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy Products",
      });
    }
    return res.status(200).json({
      message: "Lấy thành công!",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi trong quá trình lấy dữ liệu",
    });
  }
};

export const getDetail = async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product && product.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy Product",
        });
      }
      return res.status(200).json({
        message: "Lấy thành công!",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi trong quá trình lấy dữ liệu",
      });
    }
  };

  export const createProduct = async (req, res) => {
    try {
        // validate
        const {error} = productValid.validate(req.body, {abortEarly: false});
        if(error) {
            return res.status(400).json({
              message: error.details[0].message,
            })
          }

        // kiểm tra đã tồn tại chưa
    // const productExists = await Products.findOne({productName: data.productName});
    // if (productExists) {
    //   return res.status(404).json({
    //     message: "Product đã tồn tại",
    //   });
    // }

      const product = await Products.create(req.body);
      if (!product) {
        return res.status(404).json({
          message: "Tạo Product không thành công",
        });
      }
      return res.status(200).json({
        message: "tạo Product thành công!",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi trong quá trình tạo Product",
      });
    }
  };

  export const update = async (req, res) => {
    try {
    // validate
    const {error} = productValid.validate(req.body, {abortEarly: false});
    if(error) {
        return res.status(400).json({
            message: error.details[0].message,
        })
        }
      const product = await Products.findByIdAndUpdate(req.params.id,req.body,{new:true});
      if (!product) {
        return res.status(404).json({
          message: "Update Product không thành công",
        });
      }
      return res.status(200).json({
        message: "Update Product thành công!",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi trong quá trình Update Product",
      });
    }
  };

  export const remove = async (req, res) => {
    try {
      const data = await Products.findByIdAndDelete(req.params.id);
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