require("./mongo");
require("dotenv").config();
require("./cron_job/cron");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./utils/auth");
require("express-async-errors");
const userRouters = require("./user/user.router");
const goalRouters = require("./goal/goal.router");
const reportRouters = require("./reports/report.router");
const subscription = require("./subscription/subscription.router");
const adminRouters = require("./admin/admin.router");
const app = express();

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const middleware = require("./utils/middleware");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouters);
app.use("/goal", goalRouters);
app.use("/report", reportRouters);
app.use("/subscription", subscription);
app.use("/admin", adminRouters);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// app.listen(PORT, () => {
//   console.log(`YOUR SERVER IS WORKING AT PORT ${PORT}`);
// });
/////////////////////

const http = require("http").createServer(app);
http.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
// app.use(express.static(__dirname + "/public"));
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
const io = require("socket.io")(http);
var count = 0;
io.on("connection", (socket) => {
  count++;
  console.log(socket.id, "is online");
  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log(socket.id, "is offline");
    count--;
    console.log("total users online:-", count);
  });
  console.log("total users online:-", count);
});