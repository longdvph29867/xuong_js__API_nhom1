// import slugify from "slugify";
import Products from "../models/products.js";
import Categories from "../models/Category.js";
import { productValid } from "../validations/products.js";
import Cart from "../models/Cart.js";

export const getAll = async (req, res) => {
  try {
    const products = await Products.find().populate({
      path: 'categoryId',
      select: '_id categorieName'
    });
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
      name: error.message,
      message: "Lỗi trong quá trình lấy dữ liệu",
    });
  }
};

export const getDetail = async (req, res) => {
    try {
      const product = await Products.findById(req.params.id).populate({
        path: 'categoryId',
        select: '_id categorieName'
      });
      if (!product) {
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
        name: error.message,
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

      const product = await Products.create(req.body);
      if (!product) {
        return res.status(404).json({
          message: "Tạo Product không thành công",
        });
      }

      const unpdateCategory = await Categories.findByIdAndUpdate(product.categoryId, {
        $addToSet: {
          products: product._id
        }
      })
      if(!unpdateCategory) {
        return res.status(404).json({
          message: 'update category that bai'
        })
      }

      return res.status(200).json({
        message: "tạo Product thành công!",
        data: product,
      });
      
    } catch (error) {
      res.status(500).json({
        name: error.message,
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

      const oldProduct = await Products.findById(req.params.id);
      if(oldProduct.categoryId) {
        const category = await Categories.findByIdAndUpdate(
          oldProduct.categoryId,
          { $pull: { products: req.params.id } }
        );
  
        if (!category) {
            return res.status(400).json({
                message: "Không tìm thấy danh mục chứa sản phẩm",
            });
        }
      }

      const product = await Products.findByIdAndUpdate(req.params.id,req.body,{new:true});
      if (!product) {
        return res.status(404).json({
          message: "Update Product không thành công",
        });
      }

      const unpdateCategory = await Categories.findByIdAndUpdate(product.categoryId, {
        $addToSet: {
          products: product._id
        }
      })

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
      await Cart.updateMany(
        { "items.product": req.params.id },
        { $pull: { "items": { product: req.params.id } } }
      );

      const data = await Products.findByIdAndDelete(req.params.id);
      if(!data) {
        return res.status(400).json({
          message: 'Xoa thất bại',
        })
      }

      // Loại bỏ sản phẩm khỏi danh mục
      if(data.categoryId) {
        const category = await Categories.findOneAndUpdate(
          { products: req.params.id },
          { $pull: { products: req.params.id } }
        );
  
        if (!category) {
            return res.status(400).json({
                message: "Không tìm thấy danh mục chứa sản phẩm",
            });
        }
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