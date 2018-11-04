const slackApi = require('./slack.api');
const path = require('path');
const redis = require('redis').createClient('redis://cache');

module.exports = {
    sendRemindersToUsers: message => {
        slackUsers = ['DDUBA2QMN'];

        // mohamed, alejandro, simon, viktor, tomas, bruse, johan, alex, tadious, bernhard
        // slackUsers = ["DDUBA2QMN","DDV8GMQBW","DDUR4SNSD","DDVAJPDGT","DDUR5AESV","DDWRAM3P0","DDVAKLD5H","DDVDKEVT4","DDV8JGEBE","DDV8JN7E"];

        slackUsers.forEach(user => {
            slackApi.sendMessage(user, message);
        });
    },

    saveMessageToDatabase: async(userId, message) => {
        console.log('mo trying to write to database');

        var userName = await slackApi.getUserName(userId);
        var today = new Date();
        redis.hset(userName, today, message);
    },

    sendMessageToUser: (userId, message) => {
        slackApi.sendMessage(userId, message);
    }
};