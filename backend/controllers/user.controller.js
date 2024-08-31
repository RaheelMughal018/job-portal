import { User } from "../models/user.model.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone_number,
      address,
      password,
      first_niche,
      second_niche,
      third_niche,
      cover_letter,
      role,
    } = req.body;
    if (!name || !email || !phone_number || !address || !password || !role) {
      return next(new ErrorHandler("All fields required", 400));
    }

    if (
      role === "Job Seeker" &&
      (!first_niche || !second_niche || !third_niche)
    ) {
      return next(new ErrorHandler("Provide your preffer job niches", 400));
    }

    const exsistingUser = await User.findOne({ email });
    if (exsistingUser) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const userData = {
      name,
      email,
      phone_number,
      address,
      password,
      niches: {
        first_niche,
        second_niche,
        third_niche,
      },
      cover_letter,
      role,
    };
    if (req.files && req.files.resume) {
      const { resume } = req.files;

      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Seeker_Resume", resource_type: "auto" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(new ErrorHandler("Error uploading resume", 500));
          }
          //   console.log("Cloudinary Response:", cloudinaryResponse);

          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          console.log("Error from cloudinary", error);
          return next(new ErrorHandler("Error uploading resume", 500));
        }
      }
    }
    const user = await User.create(userData);
    sendToken(user, 201, res, "User Registered successfully");
  } catch (error) {
    next(error);
  }
});
