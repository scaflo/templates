import type { TCustomer } from "$/models/CustomerModel/Customer.model.js";
import type { TUser } from "$/models/UserModel/User.model.js";


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
      noContent: () => void;

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

      unauthorized: ({ message, errorText }: { message?: string, errorText ?: string}) => void;
      notFound: ({ message, errorText }: { message?: string, errorText ?: string}) => void;

      forbidden: ({ message, errorText }: { message?: string , errorText ?: string }) => void;
    }

    interface Request {
      user?: TUser;
      customer?: TCustomer;
      requestId: string;
    }
  }
}

export { };
