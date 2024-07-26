import { Server } from "socket.io";

export function GET(req) {
  if (!req.socket.server.io) {
    console.log("Socket is initializing");
    const io = new Server(req.socket.server);
    req.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("sendMessage", (msg) => {
        console.log("Message received:", msg);
        // In a real application, you would broadcast this message to other clients
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  return new Response("Socket is running", {
    status: 200,
  });
}
