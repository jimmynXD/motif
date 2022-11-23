oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @motifxd/cli
$ motif COMMAND
running command...
$ motif (--version)
@motifxd/cli/0.0.0 darwin-arm64 node-v18.12.1
$ motif --help [COMMAND]
USAGE
  $ motif COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`motif auth login`](#motif-auth-login)
* [`motif auth logout`](#motif-auth-logout)
* [`motif generate`](#motif-generate)
* [`motif help [COMMAND]`](#motif-help-command)
* [`motif init`](#motif-init)
* [`motif plugins`](#motif-plugins)
* [`motif plugins:install PLUGIN...`](#motif-pluginsinstall-plugin)
* [`motif plugins:inspect PLUGIN...`](#motif-pluginsinspect-plugin)
* [`motif plugins:install PLUGIN...`](#motif-pluginsinstall-plugin-1)
* [`motif plugins:link PLUGIN`](#motif-pluginslink-plugin)
* [`motif plugins:uninstall PLUGIN...`](#motif-pluginsuninstall-plugin)
* [`motif plugins:uninstall PLUGIN...`](#motif-pluginsuninstall-plugin-1)
* [`motif plugins:uninstall PLUGIN...`](#motif-pluginsuninstall-plugin-2)
* [`motif plugins update`](#motif-plugins-update)

## `motif auth login`

login to motif

```
USAGE
  $ motif auth login [-t <value>]

FLAGS
  -t, --token=<value>  add your token

DESCRIPTION
  login to motif

EXAMPLES
  $ motifxd auth login
```

## `motif auth logout`

logout of motif

```
USAGE
  $ motif auth logout

DESCRIPTION
  logout of motif

EXAMPLES
  $ motifxd auth logout
```

## `motif generate`

Generate styles data file

```
USAGE
  $ motif generate

DESCRIPTION
  Generate styles data file

EXAMPLES
  $ motifxd generate
```

_See code: [dist/commands/generate/index.ts](https://github.com/HouseOfXD/motifXD/blob/v0.0.0/dist/commands/generate/index.ts)_

## `motif help [COMMAND]`

Display help for motif.

```
USAGE
  $ motif help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for motif.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.18/src/commands/help.ts)_

## `motif init`

Initialize your project

```
USAGE
  $ motif init

DESCRIPTION
  Initialize your project

EXAMPLES
  $ motifxd init
```

_See code: [dist/commands/init/index.ts](https://github.com/HouseOfXD/motifXD/blob/v0.0.0/dist/commands/init/index.ts)_

## `motif plugins`

List installed plugins.

```
USAGE
  $ motif plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ motif plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.7/src/commands/plugins/index.ts)_

## `motif plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ motif plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ motif plugins add

EXAMPLES
  $ motif plugins:install myplugin 

  $ motif plugins:install https://github.com/someuser/someplugin

  $ motif plugins:install someuser/someplugin
```

## `motif plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ motif plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ motif plugins:inspect myplugin
```

## `motif plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ motif plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ motif plugins add

EXAMPLES
  $ motif plugins:install myplugin 

  $ motif plugins:install https://github.com/someuser/someplugin

  $ motif plugins:install someuser/someplugin
```

## `motif plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ motif plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ motif plugins:link myplugin
```

## `motif plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ motif plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ motif plugins unlink
  $ motif plugins remove
```

## `motif plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ motif plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ motif plugins unlink
  $ motif plugins remove
```

## `motif plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ motif plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ motif plugins unlink
  $ motif plugins remove
```

## `motif plugins update`

Update installed plugins.

```
USAGE
  $ motif plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
