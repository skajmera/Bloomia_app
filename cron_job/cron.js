const cron = require('node-cron');

const shell= require('shelljs');

cron.schedule('* * * * * *', () => {
  console.log('running a task every minute');

    if(shell.exec("hello world").code !==0){
        console.log("Something went wrong")
    }
},{
         scheduled: true,
         timezone: "America/New_York"
       });

    //    "start_date": ISODate("2019-01-31T10:00:00.000Z"),
    //    "end_date": ISODate("2019-01-31T10:59:59.000Z"),
/////////////////////
// const CronJob = require('cron').CronJob;
// const job = new CronJob('46 00 * * *', () => {
//     console.log('Tik');
// }, null, true, 'America/New_York');
// job.start();

// cron.schedule('46 00 * * *',() => {
//     //code to be executed
//    console.log("Tik")
//    },{
//      scheduled: true,
//      timezone: "America/New_York"
//    });


// var cron = require('node-cron');

// cron.schedule('1,2,4,5 * * * *', () => {
//   console.log('running every minute 1, 2, 4 and 5');
// });

// var cron = require('node-cron');
//    cron.schedule('0 1 * * *', () => {
//    console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
//  }, {
//    scheduled: true,
//    timezone: "America/Sao_Paulo"
//  });

// var cron = require('node-cron');

// var task = cron.schedule('* * * * *', () =>  {
//   console.log('stopped task');
// }, {
//   scheduled: false
// });

// task.start();


// var cron = require('node-cron');

// var task = cron.schedule('* * * * *', () =>  {
//   console.log('will execute every minute until stopped');
// });

// task.stop();

// var cron = require('node-cron');

// var task = cron.schedule('* * * * *', () =>  {
//   console.log('will not execute anymore, nor be able to restart');
// });

// task.destroy();