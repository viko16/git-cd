const path = require('path')
const assert = require('assert')

const fse = require('fs-extra')
const coffee = require('coffee')

const bin = path.resolve(__dirname, '../bin/git-cd.js')
const GHQ_ROOT = path.resolve(__dirname, './cloned')

// Because mocha can not test extra shell..
const testFlag = [ '--clone-only', '--inherit-url' ]

describe('cli', () => {
  it('should get help message', done => {
    coffee.fork(bin)
      // .debug()
      .expect('stdout', /\$ git-cd <repoUrl>/)
      .end(done)
  })
})

describe('clone', () => {
  const expected = path.resolve(__dirname, GHQ_ROOT, 'github.com/viko16/git-cd')

  before(() => { process.env.GHQ_ROOT = GHQ_ROOT })
  afterEach(() => fse.emptyDir(GHQ_ROOT))

  it('should work with https-url', done => {
    coffee.fork(bin, [ 'https://github.com/viko16/git-cd.git', ...testFlag ])
      // .debug()
      .expect('stdout', new RegExp(expected))
      .expect('code', 0)
      .end(err => {
        assert.ifError(err)
        fse.pathExists(expected, done)
      })
  })
})

describe('hook', () => {
  before(() => {
    process.env.GHQ_ROOT = GHQ_ROOT
    process.env.HOME = path.resolve(__dirname, 'fixtrues')
  })

  afterEach(() => fse.emptyDir(GHQ_ROOT))

  it('should execute hook', done => {
    coffee.fork(bin, [ 'https://github.com/viko16/git-cd.git', ...testFlag ])
      // .debug()
      .expect('stdout', /\[test\] hook receives:/)
      .expect('code', 0)
      .end(done)
  })

  it('should not execute hook', done => {
    coffee.fork(bin, [ 'https://github.com/viko16/git-cd.git', '--disable-hook', ...testFlag ])
      // .debug()
      .notExpect('stdout', /\[test\] hook receives:/)
      .expect('code', 0)
      .end(done)
  })
})
