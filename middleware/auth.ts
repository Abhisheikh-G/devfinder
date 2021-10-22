import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  //Get token
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Access denied, you must be signed in." });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as Secret);

    req.user = decoded.user;
    next();
  } catch (error: any) {
    if (error.message) {
      console.log(error.message);
    }

    res.status(401).json({ msg: "Invalid token." });
  }
}
