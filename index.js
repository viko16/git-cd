const fs = require('fs')
const path = require('path')

const execa = require('execa')
const which = require('which')

const shellOpts = {
  stdio: 'inherit',
  shell: true
}
const hookFile = path.resolve(path.resolve(process.env.HOME, '.git-cd', 'hook.js'))

const runClone = (repo, opts) => execa('ghq', [ 'get', opts.inheritUrl ? '' : '-p', repo ], shellOpts)
const runHook = (repo, opts) => (!opts.disableHook && fs.existsSync(hookFile)) ? execa('node', [ hookFile, repo ], shellOpts) : null
const runCd = (repo, opts) => !opts.cloneOnly && execa('ghq', [ 'look', repo ], shellOpts)

module.exports = (repo, opts) => {
  if (typeof repo !== 'string') return Promise.reject(new TypeError('Expected a string.'))
  if (!which.sync('ghq', { nothrow: true })) return Promise.reject(new Error('Please install https://github.com/motemen/ghq first'))

  return Promise.resolve(true)
    .then(() => runClone(repo, opts))
    .then(() => runHook(repo, opts))
    .then(() => runCd(repo, opts))
}
