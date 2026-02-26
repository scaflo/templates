import cookieParser from "cookie-parser";
import express, { Request, Response as ExpressResponse } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { accessLoggerMiddleware } from "$/middlewares/accessLogger.middleware.js";

import RootRouter from "./routes/routes.js";
import { createServer } from "node:http";

import { errorHandler, notFoundMiddleware } from "./middlewares/error.middleware.js";
import initializeServer from "$/config/server.config.js";
import { requestContextMiddleware } from "$/middlewares/requestContext.middleware.js";
import responseHandler from "$/middlewares/response.middleware.js";
import { applyCores } from "$/config/cors.config.js";
// import connectDB from "./config/db.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));
export type AppType = typeof app; export const server = createServer(app);
app.use(responseHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
applyCores({ app });

// db connection
// const initialize = () => {
//  connectDB();
// };
// initialize();

initializeServer({ server });

app.get("/", (_: Request, res: ExpressResponse) => {
  res.sendFile(path.join(__dirname, "../public/starter.html"));
});


app.set("trust proxy", true);

app.use(requestContextMiddleware);
app.use(accessLoggerMiddleware);

app.use("/api", RootRouter);



app.use(notFoundMiddleware);

app.use(errorHandler);