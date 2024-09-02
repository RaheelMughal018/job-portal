import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { Job } from "../models/job.model.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      title,
      company,
      location,
      description,
      salary,
      experience_level,
      job_type,
      requirements,
      position,
    } = req.body;
    const userId = req.id;

    if (
      !company ||
      !title ||
      !location ||
      !description ||
      !salary ||
      !job_type ||
      !requirements ||
      !experience_level ||
      !position
    ) {
      return next(new ErrorHandler("some error occurred", 400));
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary: Number(salary),
      experience_level,
      position,
      job_type,
      requirements,
      created_by: userId,
    });
    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
});

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  try {
    const keyword = req.params.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return next(new ErrorHandler("No jobs found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//! -------------- student -----------------------
export const getJobById = catchAsyncErrors(async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("No job found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//! ------------------ Admin --------------------------

export const getAdminJobs = catchAsyncErrors(async (req, res, next) => {
  try {
    const id = req.id;
    const jobs = await Job.find({ created_by: id });
    if (!jobs) {
      return next(new ErrorHandler("No jobs found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
