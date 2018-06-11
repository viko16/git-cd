#!/usr/bin/env node

const meow = require('meow')

const gitCd = require('.')

const cli = meow(`
  Usage
    $ git-cd <repoUrl>

  Options
    --clone-only,     Just run git clone. Wouldn't change directory
    --inherit-url,    Don't conver url from HTTP to SSH protocol
    --disable-hook,   Don't execute hook after clone

  Examples
    $ git-cd viko16/git-cd
    $ git-cd https://github.com/viko16/git-cd
`, {
  flags: {
    cloneOnly: { type: 'boolean' },
    inheritUrl: { type: 'boolean' },
    disableHook: { type: 'boolean' }
  }
})

if (cli.input.length === 0) cli.showHelp()

gitCd(cli.input[0], cli.flags)
