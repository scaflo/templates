export const normalizeEmailsMiddleware = (req, _, next) => {
  if (req.body?.email) {
    req.body.email = req.body.email.trim().toLowerCase();
  }
  next();
};
