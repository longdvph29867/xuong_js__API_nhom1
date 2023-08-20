import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 255,
        unique: true,
        defaultValue: "product"
    },
    slug: {
        type: String,
        require: false,
        unique: true,
        defaultValue: "product"
    },
    price: {
        type: Number,
        require: true,
        minLength:1,
        default: 0
    },
    description:{
        type:String,
        maxLength: 1500,
        require: true,
        defaultValue: "product"
    },
    image:{
        type: String,
        require:true,
        defaultValue: "product"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: "Products"
});

const Products = mongoose.model("Products", productsSchema);
export default Products;