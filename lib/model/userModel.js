import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const DbUser = mongoose.models.DbUser || mongoose.model("DbUser", UserSchema);

export default DbUser;
