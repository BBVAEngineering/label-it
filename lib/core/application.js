import commander from 'commander';
import spinner from 'char-spinner';
import pkg from '../../package';
import findCommand from '../commands/find';
import validateCommand from '../commands/validate';
import formatCommand from '../commands/format';
import checkCommand from '../commands/check';
import handleException from '../helpers/handle-exception';

class Application {

	constructor(options = {}) {
		this.options = options;
	}

	start() {
		spinner();

		commander
			.version(pkg.version);

		commander.command('add <file> <key> <phrase>')
			.description('add label with key and phrase to json file')
			.option('-t, --threshold [number]', 'threshold indicator of string matching (0 - 100) (Default: 75)')
			.action(this.handleAddCommand.bind(this));

		commander.command('del <file> <key>')
			.description('remove label with key from json file')
			.action(this.handleDelCommand.bind(this));

		commander.command('convert <input> <output>')
			.description('convert json file to js-es6')
			.action(this.handleConvertCommand.bind(this));

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

	handleAddCommand() {

	}

	handleDelCommand() {

	}

	handleConvertCommand() {

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

}

export default Application;
