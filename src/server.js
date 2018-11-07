const express = require('express');
const bodyParser = require('body-parser');
const botLogic = require('./bot-logic');

var app = express();
port = 3030;

bodyParser.urlencoded({
    extended: true
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200);

    if (req.body.challenge) {}
    res.send('it is working');
});

app.post('/', (req, res) => {
    // check if slack is trying to confirm url
    if (req.body.challenge) {
        res.status(200);
        res.send(req.body.challenge);
        return;
    }

    // check if it's the command from mohamed
    if (
        req.body.command &&
        req.body.command == '/start-buddy' &&
        req.body.user_name == 'mohamed.elkhidir'
    ) {
        var msg = req.body.text;
        if (msg == '') return;

        console.log('log: received start buddy command');
        botLogic.sendRemindersToUsers(msg);
        res.status(200);
        res.send();
    }

    // check if a message recieved from someone
    if (req.body.event && req.body.event.type == 'message') {
        // if it's a bot message, ignore it
        if (req.body.event.bot_id) return;
        console.log(`log: received a message ${req.body.event.text} from ${req.body.event.user}`);
        // console.log('request body ', req.body);
        botLogic.saveMessageToDatabase(req.body.event.user, req.body.event.text);
        // botLogic.sendMessageToUser(
        //     req.body.event.channel,
        //     'thank you for your response, I will talk to you soon, ciao :smiley: '
        // );

        res.status(200);
        res.send();
    }
    
});

app.listen(port, () => {
    console.log('server is listening on port ', port);
});