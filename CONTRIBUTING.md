# Contributing

This doc outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd <repository-name>`
* `npm install`
* `npm link`

## Eslint

You need to follow our [eslint](https://github.com/BBVAEngineering/javascript/tree/master/eslint-config-bbva) rules.

## Debug

```
DEBUG=*:* label-it <command>
```

## Single execution test

```
$ npm test
```

## Test-driver development (TDD)

This task watch all javascripts files and breaks on first test failed.

```
$ npm run tdd
```

## Building

This task does not allow any lint failures (errors & warnings).

```
$ npm run build
```
