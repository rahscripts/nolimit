import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    email: { type: String, unique: true, trim: true},
    password: {type: String, required: true, trim:true},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;