const cron = require("node-cron");
const shell = require("shelljs");
const moment = require("moment");
const momen = require("moment-timezone");
require("dotenv").config();
const { myFunction } = require("../utils/nodemailer");
let count = 0;
const usersDataAccess = require("../user/user.dal");
cron.schedule(
  "* * * * * *",
  async () => {
    console.log("running a task every minute");
    const data = await usersDataAccess.findAll();
    for (i of data) {
      console.log(i.timezone, i.endDate, momen().tz(`${i.timezone}`).format("YYYY-MM-DD HH:mm:ss ZZ"));
      if (count !== 1) {
        if (
          momen().tz(`${i.timezone}`).format("YYYY-MM-DD HH:mm:ss ZZ") ===
          i.endDate
        ) {
          console.log("match");
          const otpSend = {
            from: process.env.email,
            to: i.email,
            subject: "Sending email using node.js",
            text: `Hello User doing your work? your time is start.`,
          };
          myFunction(otpSend);
          count++;
          break;
        }
      }
    }
  }
);
