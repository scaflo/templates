
import { USER_ROLE } from "@/constants/user.constant.js";
import {UserModel } from "@/models/UserModel/User.model.js";
import { verifyToken, VerifyTokenType } from "@/services/token.service.js";
// import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
const SemiAuthenticate = (roles: USER_ROLE[] = []) => {
  const localroles = [...roles, USER_ROLE.SUPER_ADMIN];
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      try {
        const decoded = verifyToken({
          token: token??"",
          type: VerifyTokenType.ACCESS,
        });

        const user = await UserModel.findById(decoded?.sub).lean();
        if (user) {
          if (
            localroles.length &&
            !Object.values(USER_ROLE).includes(user.role)
          ) {
            res.forbidden({
              message: "You do not have permission to access this resource",
            });
            return;
          }
        }

        if (user) {
          req.user = user

        }

      } catch (error) {
        next(error);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default SemiAuthenticate;
