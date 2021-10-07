require("./mongo");
require('dotenv').config();
require('./cron_job/cron')
const cors=require('cors')
const morgan=require('morgan')
const express = require("express");
require('express-async-errors')
const userRouters = require("./user/user.router");
const app = express();
const middleware=require('./utils/middleware')
const PORT = process.env.PORT || 3000;


app.use(cors())
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouters);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS WORKING AT PORT ${PORT}`);
});