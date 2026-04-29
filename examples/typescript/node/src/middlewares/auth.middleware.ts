import { USER_ROLE } from "@/constants/user.constant.js";
import { UserModel } from "@/models/UserModel/User.model.js";
import {
  getRefreshCookieName,
  hashToken,
  verifyToken,
  VerifyTokenType,
} from "@/services/token.service.js";
import jwt from "jsonwebtoken";
import { JwtExpiredError } from "@/utils/appError.js";
import type{ NextFunction, Request, Response } from "express";
import envConfig from "@/config/env.config.js";
const authenticate = (roles: USER_ROLE[] = []) => {
  const allowedRoles = roles?.length ? [...roles, USER_ROLE.SUPER_ADMIN] : null;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const pannel = req?.body?.pannel ?? "user";
      const cookieName = getRefreshCookieName({ pannel });
      const refreshToken = req.cookies?.[cookieName];

      if (!token && refreshToken) {
        res.unauthorized({
          message: "Session expired. Please reload.",
        });
        return;
      }
      if (!token) {
        res.unauthorized({
          message: "Token not found",
        });
        return;
      }

      try {
        const decoded = verifyToken({
          token: token,
          type: VerifyTokenType.ACCESS,
        });

        const user = await UserModel.findById(decoded?.sub).lean();
        if (!user) {
          if (refreshToken) {
            await UserModel.updateOne(
              { "refreshTokens.tokenHash": hashToken(refreshToken) },
              {
                $pull: {
                  refreshTokens: { tokenHash: hashToken(refreshToken) },
                },
              },
            );

            res.clearCookie("refreshToken", {
              httpOnly: true,
              secure: envConfig.IS_PROD,
              sameSite: envConfig.IS_PROD ? "lax" : "none",
              path: "/",
            });
          }

          res.badRequest({
            message: "User not found",
            statusCode: 400,
          }); return;
        }

        if (allowedRoles && !allowedRoles.includes(user.role)) {
          res.forbidden({
            message: "You do not have permission to access this resource",
          }); return;
        }

        req.user = user;
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          throw new JwtExpiredError("Session expired. Please reload.");
        }
        next(error); return;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};



export default authenticate;
// Named export for compatibility with existing imports
export const authMiddleware = authenticate;
