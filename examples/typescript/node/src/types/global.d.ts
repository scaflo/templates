import { IUser } from "$/models/User.model.ts";
import { UploadApiResponse } from "cloudinary";

declare global {
  namespace Express {
    interface Response {
      success: ({
        data,
        message,
        statusCode,
      }: {
        data?: object;
        message?: string;
        statusCode?: number;
      }) => void;

      created: ({
        data,
        message,
        statusCode,
      }: {
        data: object;
        message?: string;
        statusCode?: number;
      }) => void;

      badRequest: ({
        message,
        statusCode,
      }: {
        message?: string;
        statusCode?: number;
      }) => void;
    }

    interface Request {
      user?: IUser;
      cloudinaryResult?: UploadApiResponse | UploadApiResponse[];
      // user?: {
      //   name: string;
      //   email: string;
      //   userType: string;
      // };
    }
  }
}

export { };
