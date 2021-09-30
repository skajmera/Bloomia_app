require("./user/user.dal");
const morgan=require('morgan')
const express = require("express");
const path = require('path');
// const upload = require("./middleware/multer");
const userRouters = require("./user/user.router");
const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const PORT = 3000;
app.use("/users", userRouters);

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS WORKING AT PORT ${PORT}`);
});