let repo
let config
let twit

module.exports = {
  init: function () {
     repo = require('../Github/repoConfig')
     config = require('./config.json')
     twit = new (require('twit'))(config)
  },
  create: function (commit, languages) {
    let langs = ''
    if (languages) {
      let count = 0
      langs += ' Using '
      for (let key in languages) {
        if (count++ < 3) {
          langs += '#' + key + ' '
        }
      }
      count = 0
    }
    return {
      status: 'Repo ' + repo.github_repo_name + ' updated! Take a look!' + langs + '\n' + repo.github_repo_url
    }
  },

  post: function (options) {
    return new Promise(function (resolve, reject) {
      twit.post('statuses/update', options, function (error) {
        if (error) return reject(error)
        resolve('Twgit posted /,,/,')
      })
    })
  }
}
