import envConfig from "$/config/env.config.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import crypto from "node:crypto";

// import { BadRequestError, JwtExpiredError } from "$/utils/appError.js";

const ACCESS_TOKEN_TTL = "1d";
const REFRESH_TOKEN_TTL = "15d";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ sub: userId }, envConfig.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ sub: userId }, envConfig.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL,
  });
};

export const generateToken = (data: string): string => {
  return jwt.sign({ data }, envConfig.JWT_SECRET, { expiresIn: "15d" });
};

// export const generateToken = (data: string) => {
//   return jwt.sign({ data: data }, envConfig.JWT_SECRET, {
//     expiresIn: "15d",
//   });
// };

export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export enum VerifyTokenType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export const verifyToken = ({
  token,
  type,
}: {
  token?: string;
  type: VerifyTokenType;
}): JwtPayload | void => {
  const secret =
    type === VerifyTokenType.ACCESS
      ? envConfig.JWT_SECRET
      : envConfig.JWT_REFRESH_SECRET;

  if (token) {
    return jwt.verify(token, secret) as JwtPayload;
  }
};

export function getRefreshCookieName(orgId: string) {
  return `refreshToken-${orgId}`;
}


// import envConfig from "$/config/env.config.js";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import crypto from "node:crypto";

// // import { BadRequestError, JwtExpiredError } from "$/utils/appError.js";

// const ACCESS_TOKEN_TTL = "15m";
// const REFRESH_TOKEN_TTL = "7d";

// export const generateAccessToken = (userId: string): string => {
//   return jwt.sign({ sub: userId }, envConfig.JWT_SECRET, {
//     expiresIn: ACCESS_TOKEN_TTL,
//   });
// };

// export const generateRefreshToken = (userId: string): string => {
//   return jwt.sign({ sub: userId }, envConfig.JWT_REFRESH_SECRET, {
//     expiresIn: REFRESH_TOKEN_TTL,
//   });
// };

// export const generateToken = (
//   data: string,
// ): string => {
//   return jwt.sign({ data }, envConfig.JWT_SECRET, { expiresIn:"15d" });
// };

// // export const generateToken = (data: string) => {
// //   return jwt.sign({ data: data }, envConfig.JWT_SECRET, {
// //     expiresIn: "15d",
// //   });
// // };

// export const hashToken = (token: string): string => {
//   return crypto.createHash("sha256").update(token).digest("hex");
// };

// export enum VerifyTokenType {
//   ACCESS = "ACCESS",
//   REFRESH = "REFRESH",
// }

// export const verifyToken = (
//   token: string,
//   type: VerifyTokenType
// ): JwtPayload => {
//     const secret =
//       type === VerifyTokenType.ACCESS
//         ? envConfig.JWT_SECRET
//         : envConfig.JWT_REFRESH_SECRET;

//     return jwt.verify(token, secret) as JwtPayload;
// };


