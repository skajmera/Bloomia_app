const subscriptionDataAccess = require("./subscription.dal");
const ExpressError = require("../utils/errorGenerator");
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
  const storeData = await subscriptionDataAccess
    .storeData(subData)
    .then((data) => {
      return storeData;
    })
    .catch((err) => {
      return err;
    });
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
  await stripe.subscriptions
    .del(req.body.subscriptionId)
    .then(async (customer) => {
      return customer;
    })
    .catch((err) => {
      return err;
    });
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
  console.log(resp);
  req.body.productId = resp.id;
  req.body.priceId = res.id;
  const result = await createPlan(req.body);
  return result;
};

exports.getSubscription = async (req) => {
  const sub = await subscriptionDataAccess.findSub();
  return {
    error: false,
    sucess: true,
    message: "Get subscription data",
    data: sub,
  };
};

exports.deletePlan = async (req) => {
  return await delPlan(req)
};

const delPlan = async (req) => {
  const deleteData=await stripe.plans.del(
    req.body.priceId
  )
  return deleteData
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
    "cvc":123

}
*/
