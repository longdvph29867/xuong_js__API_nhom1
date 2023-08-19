import Joi from "joi";

export const productValid = Joi.object ({
    productName: Joi.string().required().min(3).max(255).messages({
        "string.empty": "Tên danh mục không để trống",
        "any.required": "Tên danh mục là bắt buộc",
        "string.min": "Tên danh mục phải có ít nhất 3 ký tự",
        "string.max": "Tên danh mục phải có ít hơn 255 ký tự",
    }),
    price: Joi.number().required().messages({
        "number.empty": "Giá không được để trống",
        "any.required": "Giá là bắt buộc",
        'number.base': "Giá là số nguyên",
    }),
    image: Joi.string().required().messages({
        "string.empty": "Ảnh không để trống",
    }),
}).unknown(true);