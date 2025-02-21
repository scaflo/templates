import { NextFunction, Request, Response } from "express";
declare const authenticate: (roles?: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default authenticate;
//# sourceMappingURL=auth.middleware.d.ts.map