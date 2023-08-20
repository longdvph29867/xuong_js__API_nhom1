import slugify from "slugify";
import Categories from "../models/Category.js";
import Products from "../models/products.js"
import { categoryValid } from "../validations/categories.js";

export const getAll = async (req, res) => {
  try {
    const category = await Categories.find();
    if (!category && category.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy category",
      });
    }
    return res.status(200).json({
      message: "Lấy thành công!",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi trong quá trình lấy dữ liệu",
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const category = await Categories.findOne({slug: req.params.slug}).populate('products');
    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục!",
      });
    }
    return res.status(200).json({
      message: "Lấy thành công 1 danh mục!",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi trong quá trình lấy dữ liệu",
    });
  }
};

export const create = async (req, res) => {
  try {
    // validate
    const {error} = categoryValid.validate(req.body, {abortEarly: false});
    if(error) {
      return res.status(400).json({
        message: error.details[0].message,
      })
    }

    // chuyen name sang slug
    let data = {...req.body}
    data.slug = slugify(data.categorieName, { lower: true})

    // kiểm tra đã tồn tại chưa
    const categoryExists = await Categories.findOne({slug: data.slug});
    if (categoryExists) {
      return res.status(404).json({
        message: "Danh mục đã tồn tại",
      });
    }

    // add data base
    const category = await Categories.create(data);
    if(!category) {
      return res.status(404).json({
        message: 'Tạo danh mục thất bại'
      })
    }

    return res.status(200).json({
      message: "Tạo danh mục thành công",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    // validate
    const {error} = categoryValid.validate(req.body, {abortEarly: false});
    if(error) {
      return res.status(400).json({
        message: error.details[0].message,
      })
    }

    // chuyen name sang slug
    let data = {...req.body}
    data.slug = slugify(data.categorieName, { lower: true})

    // kiểm tra đã tồn tại chưa
    const categoryExists = await Categories.findOne({slug: data.slug});
    if (categoryExists) {
      return res.status(404).json({
        message: "Danh mục đã tồn tại",
      });
    }

    // kiểm tra đã tồn tại chưa
    const category = await Categories.findByIdAndUpdate(req.params.id, data, { new: true });
    if(!category) {
      return res.status(404).json({
        message: 'Cập nhật danh mục thất bại'
      })
    }
    
    return res.status(200).json({
      message: "Cập nhật danh mục thành công",
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
    const data = await Categories.findByIdAndDelete(req.params.id);
    if(!data) {
      return res.status(400).json({
        message: 'Xoa thất bại',
      })
    }

    // Cập nhật thông tin danh mục trong các sản phẩm thành null
    await Products.updateMany(
      { categoryId: req.params.id },
      { categoryId: null }
    );

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
