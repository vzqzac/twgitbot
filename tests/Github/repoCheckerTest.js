const assert = require('assert')
const checker = require('../../Github/repoChecker')

let message

// describe repoChecker

// context "hasn't be initialized"
message = 'should be undefined'
let uninitalizedCheckerProps = {
  lastCheck:  undefined,
  lastSHA:  undefined,
  lastCommit:  undefined
}
assert.deepStrictEqual(checker.props, uninitalizedCheckerProps, message)
