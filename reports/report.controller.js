const usersDataAccess = require("./report.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");
const momen = require("moment-timezone");

exports.updateTime = async (req, res) => {
  const creatTime = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
  console.log(creatTime);
  const _id = req.token_data._id;
  const { setTime, setCount } = req.body;
  if ((!setTime, !setCount)) {
    throw new ExpressError(401, "Bad request");
  }
  const updateData = {
    creatTime,
    toUpdate: {
      setCount: setCount,
      setTime: setTime,
      userId: _id,
    },
  };
  const update = await usersDataAccess.updateTime(updateData);
  if (!update) {
    const createData = {
      creatTime: creatTime,
      isoDate: `${creatTime}T00:00:00Z `,
      setCount: setCount,
      setTime: setTime,
      userId: _id,
    };
    const storeTime = await usersDataAccess.storeTime(createData);
    return {
      error: false,
      sucess: true,
      message: "created user set time successfully",
      data: storeTime,
    };
  }
  return {
    error: false,
    sucess: true,
    message: "updated user set time successfully",
    data: update,
  };
};

exports.getAllusers = async (req, res) => {
  const users = await usersDataAccess.findAll();
  return {
    error: false,
    sucess: true,
    message: "Get all users Successfully",
    data: users,
  };
};

exports.getReportDate = async (req) => {
  const creatTime = req.body.creatTime;
  const users = await usersDataAccess.findUser({ creatTime: creatTime });
  if (!users[0]) {
    throw new ExpressError(401, " this date is not exist");
  }
  return {
    error: false,
    sucess: true,
    message: "Get report data",
    data: users,
  };
};

exports.getReportMonth = async (req) => {
  let m = momen().tz("Asia/Kolkata").format("MM");
  let year = momen().tz("Asia/Kolkata").format("YYYY");
  let n = req.body.monthNumber;
  if (n > m) {
    n = n - m;
    m = 12;
    year--;
  }
  let month = m - n;
  if (month < 10) {
    month = "0" + month;
  }
  const date = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
  let changeMonth = momen().tz("Asia/Kolkata").format(`${year}-${month}-DD`);
  const users = await usersDataAccess.findUser({
    isoDate: {
      $gte: `${changeMonth}T00:00:00Z`,
      $lt: `${date}T00:00:00Z`,
    },
  });
  if (!users[0]) {
    throw new ExpressError(401, " data is not found ");
  }
  let list1 = [];
  let list2 = [];
  let countSet = 0;
  let countTime = 0;
  var dic = {};
  for (i of users) {
    let monthName = momen(new Date(i.creatTime)).format("MMM");
    if (list2.includes(monthName)) {
      countSet = countSet + i.setCount;
      countTime = countTime + i.setTime;
    } else {
      countSet = i.setCount;
      countTime = i.setTime;
      list2.push(monthName);
    }
    let mName = momen(new Date(i.creatTime)).format("MMM YYYY");
    dic[mName] = {"setCount": countSet, "setTime":countTime};
  }
  list1.push(dic);
  return {
    error: false,
    sucess: true,
    message: "Get report month ",
    data: list1,
  };
};
