#!/usr/bin/env node

const meow = require('meow')

const gitCd = require('.')

const cli = meow(`
  Usage
    $ git-cd <repoUrl>

  Examples
    $ git-cd viko16/git-cd
    $ git-cd https://github.com/viko16/git-cd
`)

if (cli.input.length === 0) cli.showHelp()

gitCd(cli.input[0])
