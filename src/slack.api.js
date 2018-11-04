var request = require('request');

const send_message_url = 'https://slack.com/api/chat.postMessage';
const bot_token = process.env.bot_token;
const app_token = process.env.app_token;

module.exports = {

    sendMessage: function(userId, message) {
        var body = {
            "text": message,
            "channel": userId,
            "bot": bot_token
        }

        var req_options = {
            'url': send_message_url,
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + app_token,
            },
            'body': JSON.stringify(body)
        }

        request.post(req_options, (err, res, body) => {
            console.log('body ', body);

        })
    }
}