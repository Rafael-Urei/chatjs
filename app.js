let app = require("http").createServer(response);
let fs = require("fs");
let io = require("socket.io")(app);
app.listen(3000);
console.log("Aplicattion running...");
function response(require, response) {
  let archive = "";
  if (require.url == "/") {
    archive = __dirname + "/index.html";
  } else {
    archive = __dirname + require.url;
  }
  fs.readFile(archive, function (error, data) {
    if (error) {
      response.writeHead(404);
      return response.end("Page or archive couldn't be found");
    }
    response.writeHead(200);
    response.end(data);
  });
}

io.on("connection", function (socket) {
  socket.on("send message", function (message_sent, callback) {
    message_sent = message_sent;

    io.sockets.emit("update messages", message_sent);
    callback();
  });
});
