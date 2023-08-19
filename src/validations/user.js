import Joi from "joi";

export const signUpValid = Joi.object({
    username: Joi.string().required().min(6).max(25).messages({
        "string.empty": "Username không để trống",
        "any.required": "Username là bắt buộc",
        "string.min": "Username phải có ít nhất 6 ký tự",
        "string.max": "Username phải có ít hơn 25 ký tự",
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email không để trống",
        "any.required": "Email là bắt buộc",
        "string.email": "Email không đúng định dạng",
    }),
    password: Joi.string().required().min(6).max(25).messages({
        "string.empty": "Password không để trống",
        "any.required": "Password là bắt buộc",
        "string.min": "Password phải có ít nhất 6 ký tự",
        "string.max": "Password phải có ít hơn 25 ký tự",
    }),
    confirmPassword: Joi.string().required().min(6).max(25).valid(Joi.ref('password')).messages({
        "string.empty": "Password không để trống",
        "any.required": "Password là bắt buộc",
        "string.min": "Password phải có ít nhất 6 ký tự",
        "string.max": "Password phải có ít hơn 25 ký tự",
        "any.only": "Password không khớp",
    }),
    role: Joi.string()
})

export const signInValid = Joi.object({
    email: Joi.string().required().email().messages({
        "string.empty": "Email không để trống",
        "any.required": "Email là bắt buộc",
        "string.email": "Email không đúng định dạng",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password không để trống",
        "any.required": "Password là bắt buộc"
    }),
})