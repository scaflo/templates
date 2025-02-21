import jwt from "jsonwebtoken";
declare class AuthService {
    generateToken(data: string): string;
    verifyToken(token: string): jwt.JwtPayload;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map