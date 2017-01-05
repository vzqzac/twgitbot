/**
 * Created by Omar on 16/08/2016.
 */

const repo = require('./repoConfig')
const https = require('https')
const HOST = 'api.github.com'
const PATH = ['/repos/', repo.github_username, '/', repo.github_repo_name].join('')
const COMMITS_PATH = '/commits?since='
const LANGUAGES_PATH = '/languages'
const UAGENT = {'User-Agent': repo.github_username}

let lastCheck
let lastSHA

function getFromAPI (complementaryPath, callback) {
  https.get({host: HOST, path: PATH + complementaryPath, headers: UAGENT}, function (res) {
    var data = ''
    res.on('data', function (chunk) {
      data += chunk.toString()
    })
    res.on('end', function () {
      callback(JSON.parse(data))
    })
  })
}

module.exports = {
  lastCheck: function (date) {
    lastCheck = date
  },
  lastSHA: lastSHA,
  fetchCommits: function (callback) {
    console.log('fetchCommits', lastCheck)
    getFromAPI(COMMITS_PATH + lastCheck, function (commits) {
      lastCheck = (new Date()).toISOString()
      console.log('commitsinerepochecker', commits);
      callback(commits)
    })
  },
  fetchLanguages: function (callback) {
    return getFromAPI(LANGUAGES_PATH, function (languages) {
      callback(languages)
    })
  }
}
