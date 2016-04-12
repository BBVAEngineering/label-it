
export default function * entries(obj) {
	for (const key of Object.keys(obj)) {
		yield [key, obj[key]];
	}
}
