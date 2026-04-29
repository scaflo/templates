import express from "express";
import { createServer } from "node:http";

import cookieParser from "cookie-parser";
import {
  errorHandler,
  notFoundMiddleware,
} from "@/middlewares/error.middleware.js";
import path, { dirname } from "node:path";


import connectDB from "@/config/db.config.js";
import initializeServer from "@/config/server.config.js";
// import router from "@/routes/routes.js";
import  { initSocket } from "@/socket.js";
import { applyCores } from "./config/cors.config.js";
import { accessLoggerMiddleware } from "@/middlewares/accessLogger.middleware.js";
import { fileURLToPath } from "node:url";
// import { connectRedis } from "@/config/redis.config.js";
import responseHandler from "@/middlewares/response.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export type AppType = typeof app;
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));
app.use("/styles", express.static(path.join(__dirname, "..", "dist")));

app.use(cookieParser());

export const server = createServer(app);
app.use(responseHandler);

app.use(express.json());
express.text();
app.use(express.urlencoded({ extended: true }));

applyCores({ app });
const initialize = () => {
  connectDB();
};
initialize();

initializeServer({ server });
initSocket(server);
// connectRedis()

app.set("trust proxy", true);

app.use(accessLoggerMiddleware);


app.use(notFoundMiddleware);

app.use(errorHandler);
