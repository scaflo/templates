import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";
import { BadRequestError, JwtExpiredError } from "../utilities/appError.js";
class AuthService {
    generateToken(data) {
        return jwt.sign({ data: data }, envConfig.JWT_SECRET, {
            expiresIn: "15d",
        });
    }
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, envConfig.JWT_SECRET);
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                throw new JwtExpiredError("Token has expired, please login again");
            }
            return decoded; // Return the decoded token payload
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new JwtExpiredError("Token has expired, please login again");
            }
            throw new BadRequestError("Invalid token");
        }
    }
}
export default new AuthService();
