interface IUser {
  name: string;
  email: string;
  userType: string;
}
declare global {
  namespace Express {
    interface Response {
      created: (data: any, message?: string) => void;
      badRequest: (message?: string) => void;
    }
    interface Request {
      user?: IUser;
    }
  }
}

export {};
