# git-cd

[![Build Status](https://img.shields.io/travis/viko16/git-cd.svg?style=flat)](https://travis-ci.org/viko16/git-cd)
[![NPM version](https://img.shields.io/npm/v/git-cd.svg?style=flat)](https://npmjs.org/package/git-cd)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)


> 👷 cd dir after git clone if not exist



## Installation

``` sh
$ npm i git-cd -g
```



## Usage

``` sh
$ git-cd <repoUrl>
```

Set up `BASE` directory: 

```sh
$ git config --global ghq.root THE_PATH_YOU_WANT
```

By default, the repository is cloned via SSH protocol. Or you can pass `--inherit-url` flag to disable it.


## Required

[motemen/ghq](https://github.com/motemen/ghq): Remote repository management made easy

```sh
go get github.com/motemen/ghq
```



## How it works

1. Clone a remote repository under the BASE directory. Just like `git clone`.
2. Run hook if exists. (Optional)
3. Change current directory to cloned repository with the shell.



## Hook

Put file in `~/.git-cd/hook.js` , and write anything in nodo.js.

Example:
``` sh
$ mkdir -p ~/.git-cd
$ echo "console.log('hook receives:', process.argv[2])" > ~/.git-cd/hook.js
```



## Directory Structures

```
$BASE
├── github.com
│   └── foo
│       └── bar
└── gitlab.com
    └── foo
        └── bar
```



## License

[MIT License](https://opensource.org/licenses/MIT) © [viko16](https://github.com/viko16)
