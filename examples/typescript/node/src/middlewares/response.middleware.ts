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
  }: SuccessParams,
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
  }: SuccessParams,
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
  params: ErrorParams & { errors?: { path: string; message: string }[] },
) => {
  const { message = "Bad Request", statusCode = 400, errors } = params;

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

// here we will take message
export const unauthorized = (
  res: Response,
  { message = "Unauthorized" }: ErrorParams,
) => {
  return res.status(401).json({
    success: false,
    message,
  });
};

export const forbidden = (
  res: Response,
  { message = "Forbidden" }: ErrorParams,
) => {
  return res.status(403).json({
    message,
  });
};

const responseHandler = (_req: Request, res: Response, next: NextFunction) => {
  res.success = ({ data = {}, message = "Operation Successful", statusCode }) =>
    successResponse(res, { data, message, statusCode });

  res.created = ({ data = {}, message = "Resource Created Successfully" }) =>
    createdResponse(res, { data, message });

  res.unauthorized = ({ message = "Unauthorized" }) =>
    unauthorized(res, { message, statusCode: 401 });
  res.forbidden = ({ message = "Forbidden" }) =>
    forbidden(res, { message, statusCode: 403 });

  res.badRequest = ({ message = "Bad Request", statusCode = 400, errors }) =>
    badRequest(res, { message, statusCode, errors });

  next();
};

export default responseHandler;
