// const express = require("express");
// const app = express();
// const http = require("http").createServer(app);
// const port = 3001;
// http.listen(port, () => {
//   console.log(`app listening on port ${port}`);
// });
// app.use(express.static(__dirname + "/public"));
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// const io = require("socket.io")(http);
// // let users = {};

// var count=0
// io.on("connection", (socket) => {
//   count++
//   console.log(socket.id,"is online");
// //   users[socket.id]=socket.id
//   socket.on("message", (msg) => {
//     console.log(msg);
//     socket.broadcast.emit("message",msg);
//   })
//   socket.on('disconnect', () => {
//     console.log(socket.id,'is offline');
//     // delete users[socket.id];
//     count--
//   console.log("total users online:-",count);
//   });
//   console.log("total users online:-",count);
// })

