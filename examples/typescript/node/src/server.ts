import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response as ExpressResponse } from "express";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import { fileURLToPath } from "url";

import RootRouter from "./routes/routes.js";
import { createServer } from "http";
import initializeServer from "./config/template.config.js";
import { errorHandler, notFoundMiddleware } from "./middlewares/error.middleware.js";
// import connectDB from "./config/db.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
export type ServerType = ReturnType<typeof app>;
export const server = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// db connection
// const initialize = () => {
//  connectDB();
// };
// initialize();

app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
initializeServer({ server });

app.get("/", (_: Request, res: ExpressResponse) => {
  res.sendFile(path.join(__dirname, "../public/starter.html"));
});

app.use("/api", RootRouter);



app.use(notFoundMiddleware);

app.use(errorHandler);