import jwt from "jsonwebtoken";

export async function authmiddleware(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "User not valid"
    });
  }

  try {

    const user = jwt.verify(token, process.env.SECRET_KEY);

    if (!user) {
      return res.status(401).json({
        message: "User is not valid"
      });
    }

    req.user = user;
    next();   // move to next middleware / route

  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
}