import { User } from "../models/user.model.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { fullname, email, phone_number, password, role } = req.body;

    if (!fullname || !email || !phone_number || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    // const file = req.file;
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("Email already exists", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      fullname,
      email,
      phone_number,
      password: hashedPassword,
      role,
      // profile: {
      //   profilePhoto: cloudResponse.secure_url,
      // },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      createdUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* login
export const login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return next(new ErrorHandler("All fields required", 400));
    }
    let user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    //* check user role
    if (user.role !== role) {
      return next(
        new ErrorHandler("Account doesn't exsist with current role!", 403)
      );
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("from login route", error);
    next(error);
  }
});

//* user logout

export const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* update Profile

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const { fullname, email, phone_number, bio, skills } = req.body;
    const file = req.file;
    const userId = req.id; // middleware authentication
    console.log("userID: " + userId);

    //! cloudinary ...
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    let user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    //* update user
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phone_number) user.phone_number = phone_number;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //! resume comes later....

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
