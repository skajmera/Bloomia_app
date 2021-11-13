const subscriptionDataAccess = require("./subscription.dal");
const ExpressError = require("../utils/errorGenerator");
const momen = require("moment-timezone");

const stripe = require("stripe")(
  "sk_test_51Jts6FF72adyi7uKADmuPOnsUmNiZxt4EXRbni1hyCxh0V2rJn61hvTpTNU5xSaIgpiaR6RxJgJb8zl6HOI6KNlC0092yHHQ0h"
);
require("../utils/jwt");

exports.payment = async (req) => {
  const customer = await customers(req);
  const result = await card(customer, req);
  const subscription = await toke(result, req);
  const sub = await subscriptionData(subscription, req);
  const subData = await subId(sub);
  subData.createTime = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
  subData.isoDate =
    momen().tz("Asia/Kolkata").format("YYYY-MM-DD") + "T00:00:00Z";
  return await subscriptionDataAccess.storeData(subData);
};

const customers = async (req) => {
  try {
    const createCustomer = await stripe.customers.create({
      email: req.body.stripeEmail,
      description: req.body.description,
      name: req.body.name,
      address: {
        line1: req.body.address,
        postal_code: req.body.zip,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
      },
    });
    return createCustomer;
  } catch (err) {
    return err;
  }
};

const card = async (customer, req) => {
  let param = {};
  param.card = {
    number: req.body.cardNumber,
    exp_month: req.body.expMonth,
    exp_year: req.body.expYear,
    cvc: req.body.cvc,
  };
  return {
    token: await stripe.tokens.create(param),
    customerId: customer.id,
  };
};

const toke = async (result, req) => {
  const token = result["token"]["id"];
  const id = result.customerId;
  return await stripe.customers.createSource(id, {
    source: token,
  });
};

const subscriptionData = async (subscription, req) => {
  return await stripe.subscriptions.create({
    customer: subscription.customer,
    items: [
      {
        price: req.body.priceId,
      },
    ],
  });
};

const subId = async (sub) => {
  var data = {};
  data.priceId = sub.plan.id;
  data.subId = sub.id;
  data.periodStart = sub.current_period_start;
  data.periodEnd = sub.current_period_end;
  data.invoiceId = sub.latest_invoice;
  return data;
};

exports.cancleSubscription = async (req) => {
  return await canclesub(req);
};

const canclesub = async (req) => {
  const subscribe = await stripe.subscriptions.del(req.body.subscriptionId);
  return subscribe;
};

const createPlan = async (data) => {
  const plan = await stripe.plans.create({
    amount: data.planPrice * 100,
    currency: data.currency,
    interval: "year",
    interval_count: data.stripeDuration,
    product: data.productId,
  });
  data.stripePlanId = plan.id;
  return data;
};

exports.createProduct = async (req) => {
  const data1 = await createProduct(req);
  const data2 = await price(data1, req);
  return await creatp(data2, data1, req);
};

const createProduct = async (req) => {
  const resp = await stripe.products.create({
    name: req.body.planName,
    description: req.body.description,
  });
  return resp;
};

const price = async (resp, req) => {
  const res = await stripe.prices.create({
    unit_amount: req.body.planPrice * 100,
    currency: req.body.currency,
    recurring: { interval: "year" },
    product: resp.id,
  });
  return res;
};

const creatp = async (res, resp, req) => {
  req.body.productId = resp.id;
  req.body.priceId = res.id;
  const result = await createPlan(req.body);
  return result;
};

// exports.getSubscription = async (req) => {
//   const createTime = req.body.createTime;//"2021-10-23"
//   const sub = await subscriptionDataAccess.findSub({createTime:createTime});
//   let totalSubscription=0
//   for(i of sub){
//     totalSubscription++;
//   }
//   return {
//     error: false,
//     sucess: true,
//     message: "Get subscription data",
//     data: sub,
//     totalSubscription:totalSubscription
//   };
// };

exports.deletePlan = async (req) => {
  return await delPlan(req);
};

const delPlan = async (req) => {
  const deleteData = await stripe.plans.del(req.body.priceId);
  return deleteData;
};

exports.getReportDays = async (req) => {
  const n = 30; //req.body.dayNumber;
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
  let n = req.body.yearNumber;
  year = year - n;
  // const date = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const date = momen().tz("Asia/Kolkata").format();
  let changeMonth = momen().tz("Asia/Kolkata").format(`${year}-MM-DD`);
  const reports = await subscriptionDataAccess.findSub({
    isoDate: {
      $gte: `${changeMonth}T00:00:00Z`,
      $lt: `${date}T00:00:00Z`,
    },
  });
  if (!reports[0]) {
    throw new ExpressError(401, " data is not found ");
  }
  let totalSubscription = 0;
  for (i of reports) {
    totalSubscription++;
  }
  return {
    error: false,
    sucess: true,
    message: "Get subscription last year",
    // data: reports,
    totalSubscription: totalSubscription,
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
  let totalSubscription = 0;
  for (i of reports) {
    totalSubscription++;
  }
  return {
    error: false,
    sucess: true,
    message: "Get subscription last six month",
    data: reports,
    totalSubscription: totalSubscription,
  };
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
    "cvc":1

*/
