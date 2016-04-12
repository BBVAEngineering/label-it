import { EventEmitter } from 'events';
import spinner from 'char-spinner';

const eventer = new EventEmitter();
let spinnerInterval;

eventer.on('spinner.start', () => {
	spinnerInterval = spinner();
});

eventer.on('spinner.stop', () => {
	clearInterval(spinnerInterval);
});

export default eventer;
