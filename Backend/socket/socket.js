module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("join-document", async (documentId) => {
      socket.join(documentId); // Join a specific document room
    });

    socket.on("send-changes", (documentId, changes) => {
      socket.broadcast.to(documentId).emit("receive-changes", changes); // Broadcast changes to others
    });

    socket.on("save-document", async (documentId, content) => {
      // Save the document changes to the database
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
