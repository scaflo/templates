import { IUser } from "$/models/User.model.ts";

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

      created: ({ data, message }: { data?: object; message?: string }) => void;

      //  errors: err.issues.map((issue) => ({
      // path: issue.path.join("."), // ex: "email", "user.address.zip"
      // message: issue.message,
      // })),
      badRequest: ({
        message,
        statusCode,
        errors,
      }: {
        message?: string;
        statusCode?: number;
        errors?: {
          path: string;
          message: string;
        }[];
      }) => void;

      unauthorized: ({ message }: { message?: string }) => void;

      forbidden: ({ message }: { message?: string }) => void;
    }

    interface Request {
      user?: IUser;
      requestId: string;
      // user?: {
      //   name: string;
      //   email: string;
      //   userType: string;
      // };
    }
  }
}

export { };
