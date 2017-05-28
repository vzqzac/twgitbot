/**
 * Created by Omar on 16/08/2016.
 */

let repo
const github = require('./config.json')
const https = require('https')

let lastCheck
let lastSHA
let lastCommit

function getFromAPI (complementaryPath) {
  return new Promise(function (resolve, reject) {
    https.get({ host: github.HOST, path: repo.path, headers: repo['User-Agent'] }, function (res) {
      var data = ''
      res.on('data', function (chunk) {
        data += chunk.toString()
      })
      res.on('end', function () {
        resolve(JSON.parse(data))
      })
    }).on('error', function (error) {
      reject(error)
    })
  })
}

module.exports = {
  init: function (date) {
    repo = require('./repoConfig.json')
    lastCheck = date
  },

  updateLastCheck: function (date) {
    lastCheck = date
    return lastCheck
  },

  updateLastSHA: function (newSHA) {
    lastSHA = newSHA
    return lastSHA
  },

  updateLastCommit: function (newCommit) {
    lastCommit = newCommit
    return lastCommit
  },

  shouldFetch: function (newSHA) {
    return !lastSHA || lastSHA !== newSHA
  },

  fetchCommits: function (callback) {
    return getFromAPI(github.COMMITS_PATH + lastCheck)
  },

  fetchLanguages: function () {
    return getFromAPI(github.LANGUAGES_PATH)
  },

  props: {
    lastCheck,
    lastSHA,
    lastCommit
  }
}
