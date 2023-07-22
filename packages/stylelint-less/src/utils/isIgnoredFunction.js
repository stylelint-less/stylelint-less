const IGNORED_FUNCTIONS = new Set(['url']);

export default function isIgnoredFunction({ type, value }) {
	return type === 'function' && IGNORED_FUNCTIONS.has(value.toLowerCase());
}
