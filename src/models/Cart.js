import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ]
}, {
    timestamps: true,
    versionKey: false,
    collection: "Carts",
}

);


const Cart = mongoose.model('Carts', cartSchema);

export default Cart;
