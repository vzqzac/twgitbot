'use strict'

const checker = require('./Github/repoChecker')
const twitMessager = require('./Twitter/postTwit')

// In order to work with heroku I need a server so...
const express = require('express')
const app = express()

app.all('*', function (req, res) {
  res.send("Hello, I'm Twgitbot\nFind me on https://github.com/VzqzAc/twgitbot")
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
