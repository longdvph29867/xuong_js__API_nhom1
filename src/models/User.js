import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 6,
        maxLength: 25,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 255,
        require: true,
    },
    role: {
        type: String,
        default: "menber",
    },
}, {
    timestamps: true,
    versionKey: false,
    collection: "Users",
}

);
const User = mongoose.model('Users', userSchema);

export default User;
