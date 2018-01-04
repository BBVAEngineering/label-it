# label-it

> Util for handle labels on json file

## Install

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
