/**
 * Check if a value is an object
 * @param {unknown} o - The value to check
 * @returns {boolean}
 */
function isObject(o) {
	return Object.prototype.toString.call(o) === '[object Object]';
}

/**
 * Check if a value is a plain object
 * @param {unknown} o - The value to check
 * @returns {boolean}
 */
export default function isPlainObject(o) {
	var ctor, prot;

	if (isObject(o) === false) return false;

	ctor = o.constructor;
	if (ctor === undefined) return true;

	prot = ctor.prototype;
	if (isObject(prot) === false) return false;

	if (prot.hasOwnProperty('isPrototypeOf') === false) {
		return false;
	}

	return true;
}
