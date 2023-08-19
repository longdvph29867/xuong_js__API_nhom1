import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    categorieName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 255,
        unique: true,
        defaultValue: "uncategorized"
    },
    slug: {
        type: String,
        require: true,
        unique: true,
        defaultValue: "uncategorized"
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: "Categories"
});

const Categories = mongoose.model("Categorie", categoriesSchema);
export default Categories;