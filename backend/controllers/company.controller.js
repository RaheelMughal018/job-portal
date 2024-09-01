import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { Company } from "../models/company.model.js";
export const registerCompany = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(new ErrorHandler("Company name field is required", 400));
    }
    let company = await Company.findOne({ name });
    if (company) {
      return next(new ErrorHandler("Company already exists", 400));
    }

    const createdCompany = await Company.create({
      name,
      user_id: req.id,
    });
    // console.log("comapproved", createdCompany);

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: createdCompany,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Error creating company", 500));
  }
});

export const getCompany = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ user_id: userId });
    if (!companies) {
      return next(new ErrorHandler("No companies found for this user", 404));
    }
    res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      companies,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Error getting company", 500));
  }
});

// get comapny by id
export const getCompanyById = catchAsyncErrors(async (req, res, next) => {
  console.log("in getCompanyById");

  try {
    const companyId = req.params.id;
    console.log("Getting company", companyId);

    const company = await Company.findById(companyId);
    if (!company) {
      return next(new ErrorHandler("Company not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Company fetched successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Error getting company by id", 500));
  }
});

// update company

export const updateCompany = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //! cloudinary...
    const updatedData = { name, description, website, location };

    const companyId = req.params.id;
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updatedData,
      { new: true, runValidators: true }
    );
    console.log("Updated company", updatedCompany);

    if (!updatedCompany) {
      return next(new ErrorHandler("Company not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Error updating company", 500));
  }
});
