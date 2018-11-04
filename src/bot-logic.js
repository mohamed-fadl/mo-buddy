const slackApi = require('./slack.api');

const message = `hey buddy, I am mohamed\'s buddy and he 
                    just wanna know if you worked with sprint stuff 
                    last working day, just for archiving reasons`;

module.exports = {
    sendRemindersToUsers: () => {
        slackUsers = ["DDE1M5WG4"];

        slackUsers.forEach(user => {
            slackApi.sendMessage(user, message);
        });
    }
}