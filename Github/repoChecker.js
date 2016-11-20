/**
 * Created by Omar on 16/08/2016.
 */
// Check repo once a while

const repo = require('./repoConfig')
const https = require('https')
const host = 'api.github.com'

var lastCommitOptions = {
  hostname: host,
  path: '/repos/' + repo.author + '/' + repo.source
}

// write the tweet in a different js file, export info about commit, check if id is different than the last one here or in index file
