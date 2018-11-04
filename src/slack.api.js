var request = require('request');

const send_message_url = 'https://slack.com/api/chat.postMessage';
const get_user_info_url = 'https://slack.com/api/users.info';

const bot_token = process.env.bot_token;
const app_token = process.env.app_token;

const request_headers = {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + bot_token
};

module.exports = {
    sendMessage: (userId, message) => {
        var body = {
            text: message,
            channel: userId,
            as_user: false,
            icon_emoji: ':robot_face:'
        };

        var req_options = {
            url: send_message_url,
            headers: request_headers,
            body: JSON.stringify(body)
        };

        request.post(req_options, (err, res, body) => {
            console.log('response ', body);
        });
    },

    getUserName: async userId => {
        var req_options = {
            url: `${get_user_info_url}?user=${userId}`,
            headers: request_headers
        };

        return new Promise(resolve => {
            request.get(req_options, (err, res, body) => {
                var userInfo = JSON.parse(body);
                resolve(userInfo.user.name);
            });
        });
    }
};