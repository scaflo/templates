import type { NextFunction, Request, Response } from "express";

export type SuccessParams = {
  data: object;
  message?: string;
  statusCode?: number;
};

export type ErrorParams = {
  message?: string;
  statusCode?: number;
  errorText?: string;
  errors?: object | undefined
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
export const created = (
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
export const noContent = (
  res: Response
) => {
  return res.status(204)
};

// 400 Bad Request
export const badRequest = (
  res: Response,
  params: ErrorParams,
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
  { message = "Unauthorized", errorText }: ErrorParams,
) => {
  return res.status(401).json({
    success: false,
    message,
    errorText
  });
};
export const notFound = (
  res: Response,
  { message = "Could not find resource", errorText }: ErrorParams,
) => {
  return res.status(401).json({
    success: false,
    message,
    errorText
  });
};

export const forbidden = (
  res: Response,
  { message = "Forbidden", errorText }: ErrorParams,
) => {
  return res.status(403).json({
    success: false,
    message,
    errorText
  });
};

const responseHandler = (_req: Request, res: Response, next: NextFunction) => {
  res.success = ({ data = {}, message = "Operation Successful", statusCode = 200 }) =>
    successResponse(res, { data, message, statusCode });

  res.created = ({ data = {}, message = "Resource Created Successfully" }) =>
    created(res, { data, message });

  res.noContent = () =>
    noContent(res);

  res.unauthorized = ({ message = "Unauthorized" }) =>
    unauthorized(res, { message, statusCode: 401 });
  res.forbidden = ({ message = "Forbidden" }) =>
    forbidden(res, { message, statusCode: 403 });

  res.notFound = ({ message = "Could not find resource" }) =>
    notFound(res, { message, statusCode: 404 });

  res.badRequest = ({ message = "Bad Request", statusCode = 400, errors }) =>
    badRequest(res, { message, statusCode, errors });

  next();
};

export default responseHandler;
