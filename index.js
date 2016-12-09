'use strict'

const checker = require('./Github/repoChecker')
const twitMessager = require('./Twitter/postTwit')

let interval

try {
  interval = setInterval(checkForChanges, 86400000)
} catch (e) {
  clearInterval(interval)
}

function checkForChanges () {
  checker.fetchCommits(function (commits) {
    if (!commits) return
    if (!checker.lastSHA || checker.lastSHA !== commits[0].sha) {
      checker.lastSHA = commits[0].sha
      checker.fetchLanguages(function (languages) {
        twitMessager.createAndPost(commits[0], languages)
      })
    }
  })
}
