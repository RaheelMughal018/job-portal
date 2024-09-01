import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import jwt, { decode } from "jsonwebtoken";
const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new ErrorHandler("Not authenticated, token required", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new ErrorHandler("Not authenticated, token invalid", 401));
    }
    // console.log("decoded", decoded.userId);

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default isAuthenticated;
