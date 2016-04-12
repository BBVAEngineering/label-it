
export default function errback(cb) {
	return (...args) => {
		cb(null, ...args);
	};
}
