import type { Server as HTTPServer } from "node:http";
import { Server as IOServer,type Socket } from "socket.io";
// import type { Request, Response } from "express";

interface QRStartPayload {
  subscriptionId: string;
}

export function initSocket(server: HTTPServer): IOServer {
  console.log("Socket server initialized.");
  const io = new IOServer(server, { cors: { origin: "*" } });

  io.on("connection", (socket: Socket) => {
    socket.on("qr:auto:start", (payload: QRStartPayload) => {
      const intervalId = setInterval(async () => {
        console.log(payload);
        // const fakeReq = { body: { subscriptionId: payload.subscriptionId } } as Request;

        // const fakeRes = {
        //   status: (_code: number) => ({
        //     json: (data: unknown) => socket.emit("qr:new", data),
        //   }),
        // } as unknown as Response;

        // const fakeNext = (err?: unknown) => {
        //   if (err) socket.emit("error", err);
        // };

        // await generateQR(fakeReq, fakeRes, fakeNext);
      }, 60000);

      socket.data.interval = intervalId;
    });

    socket.on("disconnect", () => {
      const intervalId = socket.data.interval as NodeJS.Timeout;
      clearInterval(intervalId);
    });
  });

  return io;
}
