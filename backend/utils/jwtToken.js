export const sendToken = async (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  user.token = token;
  await user.save();
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: message,
    user,
    token: token,
  });
};
