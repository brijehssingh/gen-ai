import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"]
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"]
  },

  password: {
    type: String,
    required: [true, "Password is required"]
  }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;