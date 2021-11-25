const subscriptionDataAccess = require("./subscription.dal");
const ExpressError = require("../utils/errorGenerator");
const momen = require("moment-timezone");
require("../utils/jwt");

exports.payment = async (req) => {
  const customer = await subscriptionDataAccess.customers(req);
  const result = await subscriptionDataAccess.card(customer, req);
  const subscription = await subscriptionDataAccess.toke(result, req);
  const sub = await subscriptionDataAccess.subscriptionData(subscription, req);
  const subData = await subscriptionDataAccess.subId(sub);
  subData.createTime = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
  subData.isoDate = momen().tz("Asia/Kolkata").format("YYYY-MM-DD") + "T00:00:00Z";
  subData.amount=sub.plan.amount
  return await subscriptionDataAccess.storeData(subData);
};

exports.cancleSubscription = async (req) => {
  return await subscriptionDataAccess.canclesub(req);
};

exports.createProduct = async (req) => {
  const data1 = await subscriptionDataAccess.createProduct(req);
  const data2 = await subscriptionDataAccess.price(data1, req);
  return await subscriptionDataAccess.creatp(data2, data1, req);
};

exports.getTotalAmountToday = async (req) => {
  const createTime = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");//req.body.createTime;//"2021-10-23"
  const sub = await subscriptionDataAccess.findSub({createTime:createTime});
  let totalAmount=0
  for(i of sub){
    if(i.amount!==undefined)
    totalAmount=totalAmount+i.amount;
  }
  return {
    error: false,
    sucess: true,
    message: "Get today total amount data",
    data: sub,
    totalAmount:totalAmount
  };
};

exports.deletePlan = async (req) => {
  return await subscriptionDataAccess.delPlan(req);
};

exports.getReportDays = async (req) => {
  const n = 30;
  let priorDate = new Date();
  priorDate.setDate(priorDate.getDate() - n);
  const lastDate = momen(priorDate).tz("Asia/Kolkata").format("YYYY-MM-DD");
  const date = momen().tz("Asia/Kolkata").format();
  const reports = await subscriptionDataAccess.findSub({
    isoDate: {
      $gte: `${lastDate}T00:00:00Z`,
      $lte: `${date}`,
    },
  });
  if (reports.length === 0) {
    throw new ExpressError(401, " data is not found ");
  }
  let totalSubscription = 0;
  for (i of reports) {
    totalSubscription++;
  }
  return {
    error: false,
    sucess: true,
    message: "Get subscription last 30 days",
    // data: reports,
    totalSubscription: totalSubscription,
  };
};

exports.getReportYear = async (req) => {
  let year = momen().tz("Asia/Kolkata").format("YYYY");
  let n = 1;
  year = year - n;
  const date = momen().tz("Asia/Kolkata").format();
  let changeMonth = momen().tz("Asia/Kolkata").format(`${year}-MM-DD`);
  let reports = await subscriptionDataAccess.findSub({
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
  let totalSubscription = 0;
  var dic = {};
  for (i of reports) {
    let monthName = momen(new Date(i.createTime)).format("MMM YYYY");
    if (list2.includes(monthName)) {
      totalSubscription++;
    } else {
      totalSubscription = 1;
      list2.push(monthName);
    }
    let mName = momen(new Date(i.createTime)).format("MMM YYYY");
    dic[mName] = { totalSubscription: totalSubscription };
  }
  list1.push(dic);
  return {
    error: false,
    sucess: true,
    d: reports,
    message: "Get report year ",
    data: list1,
  };
};

exports.getReportWeekly = async (req) => {
  const n = 7;
  let priorDate = new Date();
  priorDate.setDate(priorDate.getDate() - n);
  const lastDate = momen(priorDate).tz("Asia/Kolkata").format("YYYY-MM-DD");
  const date = momen().tz("Asia/Kolkata").format();
  const reports = await subscriptionDataAccess.findSub({
    isoDate: {
      $gte: `${lastDate}T00:00:00Z`,
      $lte: `${date}`,
    },
  });
  if (reports.length === 0) {
    throw new ExpressError(401, " data is not found ");
  }
  let totalSubscription = 0;
  for (i of reports) {
    totalSubscription++;
  }
  return {
    error: false,
    sucess: true,
    message: "Get subscription weekly",
    data: reports,
    totalSubscription: totalSubscription,
  };
};

exports.getReport6Month = async (req) => {
  let m = momen().tz("Asia/Kolkata").format("MM");
  let n = 6;
  if (n > m) {
    n = n - m;
    m = 12;
    year--;
  }
  let month = m - n;
  if (month < 10) {
    month = "0" + month;
  }
  const lastDate = momen().tz("Asia/Kolkata").format(`YYYY-${month}-DD`);
  const date = momen().tz("Asia/Kolkata").format();
  const reports = await subscriptionDataAccess.findSub({
    isoDate: {
      $gte: `${lastDate}T00:00:00Z`,
      $lte: `${date}`,
    },
  });
  if (reports.length === 0) {
    throw new ExpressError(401, " data is not found ");
  }
  let list1 = [];
  let list2 = [];
  let totalSubscription = 0;
  var dic = {};
  for (i of reports) {
    let monthName = momen(new Date(i.createTime)).format("MMM YYYY");
    if (list2.includes(monthName)) {
      totalSubscription++;
      // console.log(monthName,totalSubscription);
    } else {
      totalSubscription = 1;
      list2.push(monthName);
    }
    let mName = momen(new Date(i.createTime)).format("MMM YYYY");
    dic[mName] = { totalSubscription: totalSubscription };
  }
  list1.push(dic);
  return {
    error: false,
    sucess: true,
    // totalMonthReport: reports,
    message: "Get report six month ",
    data: list1,
  };
};

exports.getTotalAmountWeekly = async (req) => {
  const n = 7;
  let priorDate = new Date();
  priorDate.setDate(priorDate.getDate() - n);
  const lastDate = momen(priorDate).tz("Asia/Kolkata").format("YYYY-MM-DD");
  const date = momen().tz("Asia/Kolkata").format();
  const reports = await subscriptionDataAccess.findSub({
    isoDate: {
      $gte: `${lastDate}T00:00:00Z`,
      $lte: `${date}`,
    },
  });
  if (reports.length === 0) {
    throw new ExpressError(401," data is not found ");
  }
  let totalAmount=0
  for(i of reports){
    if(i.amount!==undefined)
    totalAmount=totalAmount+i.amount;
  }
  return {
    error: false,
    sucess: true,
    message: "Get weekly total amount data",
    data: reports,
    totalAmount:totalAmount
  };
};

exports.get30DaysTotalAmountDays = async (req) => {
  const n = 30;
  let priorDate = new Date();
  priorDate.setDate(priorDate.getDate() - n);
  const lastDate = momen(priorDate).tz("Asia/Kolkata").format("YYYY-MM-DD");
  const date = momen().tz("Asia/Kolkata").format();
  const reports = await subscriptionDataAccess.findSub({
    isoDate: {
      $gte: `${lastDate}T00:00:00Z`,
      $lte: `${date}`,
    },
  });
  if (reports.length === 0) {
    throw new ExpressError(401, " data is not found ");
  }
  let totalAmount=0
  for(i of reports){
    if(i.amount!==undefined)
    totalAmount=totalAmount+i.amount;
  }
  return {
    error: false,
    sucess: true,
    message: "Get 30Days total amount data",
    data: reports,
    totalAmount:totalAmount
  };
};

exports.getAmountYear = async (req) => {
  let year = momen().tz("Asia/Kolkata").format("YYYY");
  let n = 1;
  year = year - n;
  const date = momen().tz("Asia/Kolkata").format();
  let changeMonth = momen().tz("Asia/Kolkata").format(`${year}-MM-DD`);
  let reports = await subscriptionDataAccess.findSub({
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
  let totalAmount = 0;
  var dic = {};
  for (i of reports) {
    if(i.amount !== undefined){
    let monthName = momen(new Date(i.createTime)).format("MMM YYYY");
    if (list2.includes(monthName)){
      totalAmount+=i.amount
    } else {
      totalAmount=0
      totalAmount +=i.amount;
      list2.push(monthName);
    }
    let mName = momen(new Date(i.createTime)).format("MMM YYYY");
    dic[mName] = { totalAmount: totalAmount };
  }}
  list1.push(dic)
  return {
    error: false,
    sucess: true,
    d: reports,
    message: "Get total amount year ",
    data: list1,
  }
};





/*
{
    "stripeEmail":"subhash@gmail.com",
    "planName":"basic",
    "description":"subscription payment",
    "priceId":"price_1JtuU9F72adyi7uKXRYu5kaQ",
    "planPrice":200,
    "currency":"USD",
    "name":"sk_jmera",
    "address":"510 Townsend St",
    "zip":"98140",
    "city":"San Francisco",
    "state":"California",
    "country":"United States",
    "cardNumber":"4242 4242 4242 4242",
    "expMonth":5,
    "expYear":2024,
    "cvc":178
*/