// import { NextFunction, Response, Request } from "express";

// // 200 OK
// export const successResponse = (
//   res: Response,
//   data: object = {},
//   message = "Operation Successful",
//   statusCode = 200
// ) => {
//   return res.status(statusCode).json({
//     success: true,
//     message,
//     data,
//   });
// };

// // 201 Created
// export const createdResponse = (
//   res: Response,
//   data: object = {},
//   message = "Resource Created Successfully",
//   statusCode = 201
// ) => {
//   return res.status(statusCode).json({
//     success: true,
//     message,
//     data,
//   });
// };

// // 400 Bad Request
// export const badRequest = (
//   res: Response,
//   message = "Bad Request",
//   statusCode = 400
// ) => {
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     errorCode: "BAD_REQUEST_ERROR",
//   });
// };

// // Response middleware
// const responseHandler = (_req: Request, res: Response, next: NextFunction) => {
//   res.success = (data: object, message?: string, statusCode?: number) =>
//     successResponse(res, data, message, statusCode ?? 200);

//   res.created = (data: object, message?: string, statusCode?: number) =>
//     createdResponse(res, data, message, statusCode ?? 201);

//   res.badRequest = (message?: string, statusCode?: number) =>
//     badRequest(res, message, statusCode ?? 400);

//   next();
// };

// export default responseHandler;

import { NextFunction, Request, Response } from "express";

type SuccessParams = {
  data: object;
  message?: string;
  statusCode?: number;
};

type ErrorParams = {
  message?: string;
  statusCode?: number;
};

// 200 OK
export const successResponse = (
  res: Response,
  {
    data = {},
    message = "Operation Successful",
    statusCode = 200,
  }: SuccessParams
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// 201 Created
export const createdResponse = (
  res: Response,
  {
    data = {},
    message = "Resource Created Successfully",
    statusCode = 201,
  }: SuccessParams
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// 400 Bad Request
export const badRequest = (
  res: Response,
  { message = "Bad Request", statusCode = 400 }: ErrorParams
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errorCode: "BAD_REQUEST_ERROR",
  });
};

const responseHandler = (_req: Request, res: Response, next: NextFunction) => {
  res.success = ({ data = {}, message, statusCode }) =>
    successResponse(res, { data, message, statusCode });

  res.created = ({ data, message, statusCode }) =>
    createdResponse(res, { data, message, statusCode });

  res.badRequest = ({ message, statusCode }) =>
    badRequest(res, { message, statusCode });

  next();
};

export default responseHandler;
