'use strict'

const checker = require('./Github/repoChecker')
const twitMessager = require('./Twitter/postTwit')

// Init repoChecker to match current date
checker.init((new Date()).toISOString())

// In order to work with heroku I need a server so...
const express = require('express')
const app = express()

app.all('*', function (req, res) {
  res.redirect('https://github.com/VzqzAc/twgitbot')
})

let port = process.env.PORT || 3000

app.listen(port, function (error) {
  if (error) console.error(error)
})

let interval

try {
  interval = setInterval(checkForChanges, 86400000)
} catch (e) {
  clearInterval(interval)
}

function checkForChanges () {
  checker.fetchCommits()
    .then(function (commits) {
      if (!commits.length) return

      checker.updateLastCheck((new Date()).toISOString())
      let newSHA = commits[0].sha

      if (checker.shouldFetch(newSHA)) {
        checker.updateLastSHA(newSHA)
        let newCommit = checker.updateLastCommit(commits[0])
        checkLanguages(newCommit)
        checker.fetchLanguages(function (languages) {
          twitMessager.createAndPost(commits[0], languages)
        })
      }
    })
    .catch(console.error)
}

function checkLanguages (commit) {
  checker.fetchLanguages()
    .then(function (languages) {
      publishTwit(commit, languages)
    })
    .catch(console.error)
}

function publishTwit (commit, languages) {
  twitMessager.createAndPost(commit, languages)
    .then()
}
