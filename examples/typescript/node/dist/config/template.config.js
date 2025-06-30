import { createServer } from "http";
import os from "os";
import envConfig from "./env.config.js";
const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name] || []) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "localhost";
};
const startServer = ({ app }) => {
    const server = createServer(app);
    server
        .listen(envConfig.PORT, () => {
        console.log(`→ Localhost: http://localhost:${envConfig.PORT}/`);
        try {
            const localIP = getLocalIP();
            console.log(`→ Local IP : http://${localIP}:${envConfig.PORT}/`);
        }
        catch (error) {
            console.log(error?.message);
        }
    })
        .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error(`⚠️ Server error: Port ${envConfig.PORT} is already in use.`);
        }
        else {
            console.error("❌ Server error:", err.message);
            process.exit(1);
        }
    });
};
export { startServer };
