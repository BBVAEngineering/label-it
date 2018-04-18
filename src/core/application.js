import commander from 'commander';
import pkg from '../../package';
import addCommand from '../commands/add';
import delCommand from '../commands/del';
import multilanguageFilesCommand from '../commands/multilanguageFiles';
import multilanguageAppCommand from '../commands/multilanguageApp';
import findCommand from '../commands/find';
import validateCommand from '../commands/validate';
import formatCommand from '../commands/format';
import checkCommand from '../commands/check';
import mergeCommand from '../commands/merge';
import handleException from '../helpers/handle-exception';
import eventer from './eventer';

class Application {
	constructor(options = {}) {
		this.options = options;
	}

	start() {
		eventer.emit('spinner.start');

		commander
			.version(pkg.version);

		commander.command('add <file> <key> <phrase>')
			.description('add label with key and phrase to json file')
			.option('-t, --threshold [number]', 'threshold indicator of string matching (0 - 100) (Default: 75)')
			.action(this.handleAddCommand.bind(this));

		commander.command('del <file> <key>')
			.description('remove label with key from json file')
			.action(this.handleDelCommand.bind(this));

		commander.command('multilanguageFiles <input> <output>')
			.description('compare multi-language files')
			.action(this.handlemultilanguageFilesCommand.bind(this));

		commander.command('multilanguageApp <input> <output>')
			.description('compare .hbs .js files to languages files')
			.action(this.handlemultilanguageAppCommand.bind(this));

		commander.command('check <master> <slave...>')
			.description('check for duplicated keys within master and slaves')
			.action(this.handleCheckCommand.bind(this));

		commander.command('validate <file>')
			.description('validate json file of similar entries')
			.option('-t, --threshold [number]', 'threshold indicator of string matching (0 - 100) (Default: 75)')
			.action(this.handleValidateCommand.bind(this));

		commander.command('format <file>')
			.description('format json file sorting keys')
			.action(this.handleFormatCommand.bind(this));

		commander.command('find <file> <phrase>')
			.description('find a phrase in a json file')
			.option('-t, --threshold [number]', 'threshold indicator of string matching (0 - 100) (Default: 75)')
			.action(this.handleFindCommand.bind(this));

		commander.command('merge <master> <slave...>')
			.description('merge keys within master and slaves')
			.action(this.handleMergeCommand.bind(this));

		commander.command('*', null, { noHelp: true })
			.action(this.handleHelpCommand);

		commander.parse(process.argv);

		if (!process.argv.slice(2).length) {
			this.handleHelpCommand();
		}
	}

	handleHelpCommand() {
		commander.outputHelp();
	}

	handleAddCommand(file, key, phrase, options) {
		addCommand(file, key, phrase, options, handleException);
	}

	handleDelCommand(file, key) {
		delCommand(file, key, handleException);
	}

	handlemultilanguageFilesCommand(input, output) {
		multilanguageFilesCommand(input, output, handleException);
	}

	handlemultilanguageAppCommand(input, output) {
		multilanguageAppCommand(input, output, handleException);
	}

	handleCheckCommand(master, slaves) {
		checkCommand(master, slaves, handleException);
	}

	handleValidateCommand(file, options) {
		validateCommand(file, options, handleException);
	}

	handleFormatCommand(file) {
		formatCommand(file, handleException);
	}

	handleFindCommand(file, phrase, options) {
		findCommand(file, phrase, options, handleException);
	}

	handleMergeCommand(master, slaves) {
		mergeCommand(master, slaves, handleException);
	}
}

export default Application;
