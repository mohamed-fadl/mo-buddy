const slackApi = require('./slack.api');
const path = require('path');
const redis = require('redis').createClient('redis://cache');

module.exports = {
    sendRemindersToUsers: message => {
        // slackUsers = ['DDUBA2QMN'];

        // mohamed, alejandro, simon, viktor, tomas, johan, alex, tadious, bernhard
        slackUsers = ["DDUBA2QMN","DDV8GMQBW","DDUR4SNSD","DDVAJPDGT","DDUR5AESV","DDVAKLD5H","DDVDKEVT4","DDV8JGEBE","DDV8JN7E"];
        
        console.log('log: bot is sending messages for all users');

        slackUsers.forEach(user => {
            slackApi.sendMessage(user, message);
        });
    },

    saveMessageToDatabase: async(userId, message) => {

        var userName = await slackApi.getUserName(userId);
        var today = new Date();
        redis.hset(userName, today, message);

        console.log(`log: bot wrote a message to ${userName} hashset`);

    },

    sendMessageToUser: (userId, message) => {
        slackApi.sendMessage(userId, message);

        console.log(`log: bot sent single message to ${userId}`);

    }
};