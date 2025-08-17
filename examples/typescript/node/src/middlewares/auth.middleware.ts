import { UserModel } from "$/models/User.model.js";
import authService from "$/services/auth.service.js";
import { NextFunction, Request, Response } from "express";


const authenticate = (roles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        // return res.badRequest("Token not found");
        res.badRequest({
          message: "Token not found",
          statusCode: 400,
        })
        return
      }

      const decoded = authService.verifyToken(token);

      const user = await UserModel.findById(decoded.data).lean();
      if (!user) {
        // return res.badRequest("User not found");
        res.badRequest({
          message: "User not found",
          statusCode: 400,
        })
        return
      }
      if (roles.length && !roles.includes(user.userType.toString())) {
        res.badRequest({
          message: "You do not have permission to access this resource",
          statusCode: 400,
        })
        return
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authenticate;
