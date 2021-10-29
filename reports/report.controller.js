const reportsDataAccess = require("./report.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");
const momen = require("moment-timezone");

exports.updateTime = async (req, res) => {
  const creatTime = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
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
  const update = await reportsDataAccess.updateTime(updateData);
  if (!update) {
    const createData = {
      creatTime: creatTime,
      isoDate: `${creatTime}T00:00:00Z `,
      setCount: setCount,
      setTime: setTime,
      userId: _id,
    };
    const storeTime = await reportsDataAccess.storeTime(createData);
    return {
      error: false,
      sucess: true,
      message: "created report set time successfully",
      data: storeTime,
    };
  }
  return {
    error: false,
    sucess: true,
    message: "updated reports set time successfully",
    data: update,
  };
};

exports.getAllReports = async (req, res) => {
  const users = await reportsDataAccess.findAll();
  return {
    error: false,
    sucess: true,
    message: "Get all reports Successfully",
    data: users,
  };
};

exports.getReportDate = async (req) => {
  const creatTime = req.body.creatTime;//"2021-10-23"
  const reports = await reportsDataAccess.findReport({ creatTime: creatTime });
  if (!reports[0]) {
    throw new ExpressError(401, " this date is not exist");
  }
  return {
    error: false,
    sucess: true,
    message: "Get report data",
    data: reports,
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
  // const date = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const date = momen().tz("Asia/Kolkata").format();

  let changeMonth = momen().tz("Asia/Kolkata").format(`${year}-${month}-DD`);
  const reports = await reportsDataAccess.findReport({
    isoDate: {
      $gte: `${changeMonth}T00:00:00Z`,
      $lt: `${date}T00:00:00Z`,
    },
  });
  if (!reports[0]) {
    throw new ExpressError(401, " data is not found ");
  }
  let list1 = [];
  let list2 = [];
  let countSet = 0;
  let countTime = 0;
  var dic = {};
  for (i of reports) {
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
    dic[mName] = { setCount: countSet, setTime: countTime };
  }
  list1.push(dic);
  return {
    error: false,
    sucess: true,
    message: "Get report month ",
    data: list1,
  };
};

exports.getReportYear = async (req) => {
  let year = momen().tz("Asia/Kolkata").format("YYYY");
  let n = req.body.yearNumber;
  year = year - n;
  // const date = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const date = momen().tz("Asia/Kolkata").format();
  let changeMonth = momen().tz("Asia/Kolkata").format(`${year}-MM-DD`);
  const reports = await reportsDataAccess.findReport({
    isoDate: {
      $gte: `${changeMonth}T00:00:00Z`,
      $lt: `${date}T00:00:00Z`,
    },
  });
  if (!reports[0]) {
    throw new ExpressError(401, " data is not found ");
  }
  let list1 = [];
  let list2 = [];
  let countSet = 0;
  let countTime = 0;
  var dic = {};
  for (i of reports) {
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
    dic[mName] = { setCount: countSet, setTime: countTime };
  }
  list1.push(dic);
  return {
    error: false,
    sucess: true,
    message: "Get report month ",
    data: list1,
  };
};

exports.getReportDays = async (req) => {
  const n = req.body.dayNumber;
  let priorDate = new Date();
  priorDate.setDate(priorDate.getDate() - n);
  const lastDate = momen(priorDate).tz("Asia/Kolkata").format("YYYY-MM-DD");
  const date = momen().tz("Asia/Kolkata").format();
  const reports = await reportsDataAccess.findReport({
    isoDate: {
      $gte: `${lastDate}T00:00:00Z`,
      $lte: `${date}`
    }
  })
  if (reports.length === 0) {
    throw new ExpressError(401, " data is not found ");
  }
  const mappedReports = reports.map((report) => {
    return {
      setCount: report.setCount,
      setTime: report.setTime,
      date: report.creatTime
    }
  })
  const sortedReports = mappedReports.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  return {
    error: false,
    sucess: true,
    message: "Get report days ",
    data: sortedReports,
  };
};
