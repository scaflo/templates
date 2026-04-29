import cors from "cors";
import type { AppType } from "../server.js";

export const applyCores = ({ app }: { app: AppType }) => {
  const allowedOrigins = [
    "http://localhost:4173",
    "http://localhost:5174",
    "http://localhost:4550",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://app.buzzerp.in",
    "https://admin.buzzerp.in",
    "https://mmhometown.buzzerp.in",
    "http://localhost:3000",
    "https://buzzerp.in",
    "https://mymart360.com"
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) { callback(null, true); return; }

        if (allowedOrigins.includes(origin)) {
          callback(null, true); return;
        }

        callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.options(/.*/, cors());
};
