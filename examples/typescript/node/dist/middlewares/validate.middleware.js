import { ZodError } from "zod";
import { ValidationError } from "../utilities/appError.js";
// Refactored validateRequest function
export const validateRequest = (schemas) => {
    return async (req, res, next) => {
        try {
            if (schemas.body) {
                await schemas.body.parseAsync(req.body);
            }
            // Validate params
            if (schemas.params) {
                await schemas.params.parseAsync(req.params);
            }
            // Validate query
            if (schemas.query) {
                await schemas.query.parseAsync(req.query);
            }
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const validationMessages = error.errors.map((err) => err.message);
                next(new ValidationError(validationMessages, validationMessages[0]));
            }
            else {
                next(error);
            }
        }
    };
};
