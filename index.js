require('dotenv').config();
require('./src/server');

const scheduler = require('node-schedule');
const botLogic = require('./src/bot-logic');

const rule = new scheduler.RecurrenceRule();
rule.dayOfWeek = [new scheduler.Range(1, 5)]; // from monday to friday
rule.hour = 10; // 11 am
rule.minute = 30;

scheduler.scheduleJob(rule, () => {
  console.log('schedlued process started');
  var today = new Date();
  var yesterday = today.getDay() == 1 ? 'Friday' : 'yesterday';

  botLogic.sendRemindersToUsers(`hej hej, how much of ${yesterday}'s work was sprint realted ?`);
});
