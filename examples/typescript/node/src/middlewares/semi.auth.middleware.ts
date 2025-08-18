import { UserModel } from "$/models/User.model.js";
import authService from "$/services/auth.service.js";
import { Request, Response, NextFunction } from "express";

const SemiAuthenticate = (_roles: string[] = []) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const decoded = authService.verifyToken(token);

        const user = await UserModel.findById(decoded.data);
        req.user = user || undefined;
      } else {
        req.user = undefined;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default SemiAuthenticate;
