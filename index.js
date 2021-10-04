require("./mongo");
const morgan=require('morgan')
const express = require("express");
require('express-async-errors')
const userRouters = require("./user/user.router");
const app = express();
const middleware=require('./utils/middleware')
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const PORT = 3000;
app.use("/users", userRouters);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS WORKING AT PORT ${PORT}`);
});