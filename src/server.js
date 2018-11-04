const express = require('express');
const bodyParser = require('body-parser');
const botLogic = require('./bot-logic');


var app = express();
port = 3000;

bodyParser.urlencoded({
    extended: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    console.log('body ', req.body)
    console.log('param ', req.params)
    res.status(200);
    res.send('hello mohamed');
});

app.post('/', (req, res) => {

    // check if it's the command from mohamed
    if (req.body.command == '/start-buddy' && req.body.user_name == 'mohamed.elkhidir') {
        botLogic.sendRemindersToUsers();
    }

    console.log(req.body);
    res.status(200);
    res.send();
});


app.listen(port, () => {
    console.log('server is listening on port ', port);
    console.log(process.env);

})