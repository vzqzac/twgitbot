/**
 * Created by Omar on 16/08/2016.
 */

const repo = require('./repoConfig.json')
const https = require('https')

let lastCheck
let lastSHA
let lastCommit

function getFromAPI (complementaryPath) {
  return new Promise(function (resolve, reject) {
    https.get({host: HOST, path: PATH + complementaryPath, headers: UAGENT}, function (res) {
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
  init: this.updateLastCheck,

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
    return !checker.lastSHA || checker.lastSHA !== newSHA
  },

  fetchCommits: function (callback) {
    return getFromAPI(COMMITS_PATH + lastCheck)
  },

  fetchLanguages: function () {
    return getFromAPI(LANGUAGES_PATH)
  }
}
