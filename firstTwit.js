console.log('****** Configure your Twgit ******');
var fs = require('fs');
var Twit = require('twit');
var inquirer = require("inquirer");

inquirer.prompt([{
        type: 'input',
        name: 'consumer_key',
        message: 'Provide your api key :'
    },{
        type: 'password',
        name: 'consumer_secret',
        message: 'Provide your consumer secret :'
    },{
        type: 'input',
        name: 'access_token',
        message: 'Provide your access token :'
    },{
        type: 'password',
        name: 'access_token_secret',
        message: 'Provide your secret token :'
    },{
        type: 'input',
        name: 'timeout_ms',
        message: 'Timeout in millisecondes :',
        default: '30000'
    }]).then(function (answers) {
        fs.writeFile(__dirname + '/config.js', "module.exports = " + JSON.stringify(answers), function (err) {
                if (err)
                    console.log(err);
                console.log('Your first Twgit is being published');
                var config = require('./config');
                var twit = new Twit(config);
                firstTwit(twit);
        });
});




function firstTwit(twit) {
    var tweet = {
        status: 'Running my first Twgit https://git.io/vKSvG @vzqzac #Github #Twitter #Nodejs'
    }
    twit.post('statuses/update', tweet, tweeted);
    function tweeted(err, data, response) {
        if (err) {
            console.log(err);
        } else {
            console.log("Worked /,,/,");
        }
    }
}