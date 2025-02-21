export const responseMiddleware = (req, res, next) => {
    res.badRequest = (message = "Bad Request") => {
        res.status(400).json({
            success: false,
            message,
        });
    };
    res.created = (data, message) => {
        res.json({
            success: true,
            data,
            message,
        });
    };
    next();
};
