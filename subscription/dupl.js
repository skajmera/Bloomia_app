// const subscriptionDataAccess = require("./subscription.dal");
// const ExpressError = require("../utils/errorGenerator");
// const stripe = require("stripe")(
//   "sk_test_51JpoPBSDI6axxFW0mavHUEd1G44DwwK6pOJSTR07Ck172ZPoKyIjW0UOUOGCycuDgS2Ug3e8Ix7qn3goJyaxtvf400ZHS1YGQ2"
// );
// require("../utils/jwt");
// exports.payment = async (req) => {
//   await stripe.customers
//     .create({
//       email: req.body.stripeEmail,
//       description: req.body.description,
//       name: "Ashish ajmera",
//       address: {
//         line1: "510 Townsend St",
//         postal_code: "98140",
//         city: "San Francisco",
//         state: "California",
//         country: "United States",
//       },
//     })
//     .then(async (customer) => {
//       let param = {};
//       param.card = {
//         number: "4242 4242 4242 4242",
//         exp_month: 5,
//         exp_year: 2025,
//         cvc: "313",
//       };
//       return {
//         token: await stripe.tokens.create(param),
//         customerId: customer.id,
//       };
//     })
//     .then(async (result) => {
//       const token = result["token"]["id"];
//       const id = result.customerId;
//       const addCustomerToken = await stripe.customers.createSource(id, {
//         source: token,
//       });
//       return addCustomerToken;
//     })
//     .then(async (subscription) => {
//       await stripe.subscriptions
//         .create({
//           customer: subscription.customer,
//           items: [
//             {
//               price: "price_1JrLKtSDI6axxFW0mT2bS8Mo",
//             },
//           ],
//         })
//         .then(async (sub) => {
//           var data = {};
//           data.priceId = sub.plan.id;
//           data.subId = sub.id;
//           data.periodStart = sub.current_period_start;
//           data.periodEnd = sub.current_period_end;
//           data.invoiceId = sub.latest_invoice;
//           // console.log(data);
//           return data;
//         });
//     });
// };
// //////////////////////

// const createPlan = async (data) => {
//   const plan = await stripe.plans.create({
//     amount: data.planPrice * 100,
//     currency: "USD",
//     interval: "year",
//     interval_count: data.stripeDuration,
//     product: data.productId,
//   });
//   data.stripePlanId = plan.id;
//   return data;
// };
// ////////

// exports.createProduct = async (product) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       return await stripe.products
//         .create({
//           name: product.planName,
//           description: product.description,
//         })
//         .then(async (resp) => {
//           await stripe.prices
//             .create({
//               unit_amount: product.planPrice * 100,
//               currency: "USD",
//               recurring: { interval: "year" },
//               product: resp.id,
//             })
//             .then(async (res) => {
//               product.productId = resp.id;
//               product.priceId = res.id;
//               const result = await createPlan(product);

//               return resolve(result);
//             });
//         });
//     } catch (error) {
//       console.log(error);
//       return reject(error);
//     }
//   });
// };

// const createSubscription = async(data,req) =>{
//         try {
//            await stripe.subscriptions
//             .create({
//               customer:data.id,
//               items: [
//                 {
//                   price:req.priceId
//                 },
//               ],
//             })
//             .then(async (sub) => {
//             // console.log("subhash",sub);
//             const data={}
//             data.subId = sub.id;
//             data.periodStart = sub.current_period_start;
//             data.periodEnd = sub.current_period_end;
//             data.invoiceId = sub.latest_invoice
//               return (data);
//             //   console.log(data);
//             });
//         } catch (err) {

//           return (err);
//         }
// }

// createSubscription()
/*
    "stripeEmail": "uuuuuu@gmail.com",
    "planName": "bloomia",
    "description": "emailsender",
    "planPrice": 20,
    "productId": "prod_KWO7jLNUGT8fiP",
    "priceId": "price_1JrLKtSDI6axxFW0mT2bS8Mo",
    "stripePlanId": "plan_KWO74jZZRLRFsi",
    sub_1JrMJvSDI6axxFW0aa8bJFJ2',
*/