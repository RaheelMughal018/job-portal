import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must contain 3 characters"],
      maxlength: [50, "Name can't not exceed 50 characters"],
      validate: [
        validator.isAlpha,
        "Name should only contain alphabetic characters",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must contain at least 6 characters"],
      // validate: [validator.isStrongPassword, "Password should be strong"]
    },
    phone_number: {
      type: String,
      required: true,
      // validate: [validator.isNumeric, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      required: true,
    },
    niches: {
      first_niche: String,
      second_niche: String,
      third_niche: String,
    },
    resume: {
      public_id: String,
      url: String,
    },
    cover_letter: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["Job Seeker", "Employer"],
      default: "Job Seeker",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
