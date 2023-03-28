//create a express app
const app = require("express")();

//create a http server connecting our express app;
const server = require("http").createServer(app);

//create a io server connectiong out http server
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});


io.on("connection", (socket) => {
  // console.log("socket", socket);
  console.log("socket is connected");

  socket.on("chat", (payload) => {
    console.log("What is payload:", payload);
    io.emit("chat", payload);
  });
});

server.listen(5000, () => {
  console.log("app running on port 5000");
});
