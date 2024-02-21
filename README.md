# DEPRECATED

# label-it

[![Build Status](https://travis-ci.org/BBVAEngineering/label-it.svg?branch=master)](https://travis-ci.org/BBVAEngineering/label-it)
[![GitHub version](https://badge.fury.io/gh/BBVAEngineering%2Flabel-it.svg)](https://badge.fury.io/gh/BBVAEngineering%2Flabel-it)
[![npm version](https://badge.fury.io/js/label-it.svg)](https://badge.fury.io/js/label-it)
[![Dependency Status](https://travis-ci.org/BBVAEngineering/label-it.svg)](https://travis-ci.org/BBVAEngineering/label-it)

Util for handle labels on json file

## Install

Run the follow comand:

```
$ npm install -g label-it
```

## Usage

### Add a label

```
$  label-it add [options] <file> <key> <phrase> 
```

Add label with key and phrase to json file

### Remove a label

```
$  label-it  del <file> <key> 
```

Remove label with key from json file

### Files checker
```
$  label-it check <master> <slave...>
```

Check for duplicated keys within master and slaves

### Integrity validation
```
$  label-it   validate [options] <file> 
```

Validate json file of similar entries

### Formatter
```
$  label-it  format <file>
```

Format json file sorting keys

### Finder
```
$  label-it  find [options] <file> <phrase>
```

Find a phrase in a json file

### Merge files

```
$  label-it  merge <master> <slave...>
```

Merge keys within master and slaves

### Help

To check help information run the following command.

```
$ label-it help
```

## Development

### Instalation

```
$ npm link
```

### Debug

```
DEBUG=*:* label-it <command>
```

### Single execution test

```
$ npm test
```

### Test-driver development (TDD)

This task watch all javascripts files and breaks on first test failed.

```
$ npm run tdd
```

## Continuous Integration

### Build

This task does not allow any lint failures (errors & warnings).

```
$ npm run build
```

### Documentation

Documentation is generated on `yuidocs` folder.

```
$ npm run docs
```

## Code Quality

### Linting

```
$ npm run lint
```
## Contribute

If you want to contribute to this addon, please read the [CONTRIBUTING.md](CONTRIBUTING.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BBVAEngineering/label-it/tags).

## Authors

See the list of [contributors](https://github.com/BBVAEngineering/label-it/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
