console.log('****** Configure your Twgit ******')
console.log('Please provide the following information:');
const fs = require('fs')
const Twit = require('twit')
const inquirer = require('inquirer')

inquirer.prompt([
  {
    type: 'input',
    name: 'consumer_key',
    message: 'Your api key: '
  },{
    type: 'password',
    name: 'consumer_secret',
    message: 'Your consumer secret: '
  },{
    type: 'input',
    name: 'access_token',
    message: 'Your access token: '
  },{
    type: 'password',
    name: 'access_token_secret',
    message: 'Your secret token: '
  },{
    type: 'input',
    name: 'timeout_ms',
    message: 'Timeout in millisecondes: ',
    default: '30000'
  }]).then(function (twAnswers) {
      createFile('/config.js', twAnswers, function (err) {
        if (err) return console.log(err)
        inquirer.prompt([
          {
            type: 'input',
            name: 'github_username',
            message: 'Github username: '
          },{
            type: 'input',
            name: 'github_repo_name',
            message: 'Repo name to track: '
          },{
            type: 'input',
            name: 'github_repo_url',
            message: 'Repo url to track: '
          }]).then(function (gitAnswers) {
            createFile('/repoConfig.js', gitAnswers, function (err) {
              if(err) return console.log(err)
              const config = require('./config')
              let twit = new Twit(config)
              firstTwit(twit)
            })
          })
      });
});

let formatConfig = function (string) {
  return string.replace(/^{/, '{\n\t').replace(/\,/g, ',\n\t').replace(/\"/g, "'").replace(/\:/g, ': ').replace(/}$/, '\n}')
}

let createFile = function (target, answers, callback) {
  fs.writeFile(__dirname + target, 'module.exports = ' + formatConfig(JSON.stringify(answers)), function (err) {
    if(err) callback(err)
    callback(null)
  })
}

let firstTwit = function (twit) {
    const git = require('repoConfig')
    let tweet = {
        status: 'Running my first #Twgit for my repo ' + git.github_repo_name + ' #Github #Twitter #Nodejs ' + git.github_repo_url
    }
    twit.post('statuses/update', tweet, tweeted)
    function tweeted(err) {
        if (err) return console.log(err)
        console.log("First Twgit Worked /,,/,")
    }
}
