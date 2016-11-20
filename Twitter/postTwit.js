const repo = require('../Github/repoConfig')
const config = require('./config')
const Twit = require('twit')

module.exports = {
  createAndPost: function (commit, languages) {
    console.log('config', require('./config'));
    let twit = new Twit(require('./config'))
    let langs = ''
    if (languages) {
      let count = 0
      langs += ', using '
      for (key in languages) {
        if (count++ < 3) {
          langs += '#' + key + ' '
        }
      }
      count = 0
    }
    let tweet = {
      status: 'Repo ' + repo.github_repo_name + ' updated! Take a look!' + langs + '\n' + repo.github_repo_url
    }
    twit.post('statuses/update', tweet, function (err) {
      if (err) return console.log('error', err)
      console.log('Twgit posted /,,/,')
    })
  }
}
