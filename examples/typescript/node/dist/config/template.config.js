import { createServer } from "http";
const startServer = ({ port, app }) => {
    const server = createServer(app);
    server
        .listen(port, () => {
        console.log(`🚀 Server is running at http://localhost:${port}/`);
    })
        .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error(`⚠️ Server error: Port ${port} is already in use.`);
        }
        else {
            console.error("❌ Server error:", err.message);
            process.exit(1);
        }
    });
};
export { startServer };
