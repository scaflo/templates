
import os from "os";
import http from "http"
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
const initializeServer = ({ server }: { server: http.Server }) => {
  server
    .listen(envConfig.PORT, () => {
      console.log(`→ Localhost: http://localhost:${envConfig.PORT}/`);
      try {
        const localIP = getLocalIP();
        console.log(`→ Local IP : http://${localIP}:${envConfig.PORT}/`);
      } catch (error) {
        console.log(error);
      }
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("the server stopped with (Ctrl+C).");
      process.exit(0);
    });
  });
};

export default initializeServer;
