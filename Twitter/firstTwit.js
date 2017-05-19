console.log('****** Configure your Twgit ******')
console.log('Please provide the following information:')
const fs = require('fs')
const path = require('path')
const poster = require('./postTwit')
const inquirer = require('inquirer')
const checker = require('../Github/repoChecker')

inquirer.prompt([
  {
    type: 'input',
    name: 'consumer_key',
    message: 'Your api key: '
  }, {
    type: 'password',
    name: 'consumer_secret',
    message: 'Your consumer secret: '
  }, {
    type: 'input',
    name: 'access_token',
    message: 'Your access token: '
  }, {
    type: 'password',
    name: 'access_token_secret',
    message: 'Your secret token: '
  }, {
    type: 'input',
    name: 'timeout_ms',
    message: 'Timeout in millisecondes: ',
    default: '30000'
  }
])
  .then(function (twAnswers) {
    return createFile('/config.json', twAnswers)
  })
  .then(function () {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'github_username',
        message: 'Github username: '
      }, {
        type: 'input',
        name: 'github_repo_name',
        message: 'Repo name to track: '
      }, {
        type: 'input',
        name: 'github_repo_url',
        message: 'Repo url to track: '
      }
    ])
  })
  .then(function (gitAnswers) {
    gitAnswers['repo_path'] = ['/repos/', gitAnswers.github_username, '/', gitAnswers.github_repo_name].join('')
    gitAnswers['user_agent'] = { 'User-Agent': gitAnswers.github_username }
    return createFile('../Github/repoConfig.json', gitAnswers)
  })
  .then(function () {
    poster.init()
    checker.init((new Date()).toISOString())
    return firstTwit()
  })
  .then(function (success) {
    console.log(success)
  })
  .catch(function (error) {
    console.log(error)
  })

const createFile = function (target, answers, callback) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path.join(__dirname, target), JSON.stringify(answers, null, 2), function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

const firstTwit = function () {
  const repo = require('../Github/repoConfig')
  let tweet = {
    status: ['Running the first #Twgit for my repo ', repo.github_repo_name, ' #Github #Twitter #Nodejs ', repo.github_repo_url].join('')
  }
  return poster.post(tweet)
}
