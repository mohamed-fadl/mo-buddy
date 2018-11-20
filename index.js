require('dotenv').config();
require('./src/server');

const scheduler = require('node-schedule');
const botLogic = require('./src/bot-logic');

const rule = new scheduler.RecurrenceRule();
rule.dayOfWeek = [new scheduler.Range(1, 5)];
rule.hour = 11;
rule.minute = 30;

scheduler.scheduleJob(rule, () => {
  botLogic.sendRemindersToUsers();
})
