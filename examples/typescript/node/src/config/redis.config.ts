import { createClient } from "redis";

export const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

redisClient.on("connect", () => {
    console.log("Redis connecting...");
});

redisClient.on("ready", () => {
    console.log("Redis connected and ready");
});




export const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("Redis connection failed:", err);
    }
};