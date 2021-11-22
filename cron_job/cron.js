const cron = require("node-cron");
const momen = require("moment-timezone");
require("dotenv").config();
const { myFunction } = require("../utils/nodemailer");
const usersDataAccess = require("../user/user.dal");
cron.schedule("*/01 * * * *", async () => {
  const data = await usersDataAccess.findAll();
  for (i of data) {
    if (momen().tz(`${i.timezone}`).format("HH:mm") === i.endDate) {
      const otpSend = {
        from: process.env.email,
        to: i.email,
        subject: i.subject,
        text: i.text,
      };
      myFunction(otpSend);
      break;
    }
  }
});