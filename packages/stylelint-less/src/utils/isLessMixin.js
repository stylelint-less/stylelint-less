/**
 * @param {string} value
 * @return {boolean}
 */
export default function isLessMixin(value) {
	return /^[\w-_]+\([^)]*\)/g.test(value);
}
