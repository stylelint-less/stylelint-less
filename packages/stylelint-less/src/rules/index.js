import colorNoHex from './color-no-hex/index.js';
import colorNoInvalidHex from './color-no-invalid-hex/index.js';
import colorHexCase from './color-hex-case/index.js';
import noDuplicateVariables from './no-duplicate-variables/index.js';
import declarationPropertyValueNoUnknown from './declaration-property-value-no-unknown/index.js';
import containerNamePattern from './container-name-pattern/index.js';

export default {
	'color-no-hex': colorNoHex,
	'color-no-invalid-hex': colorNoInvalidHex,
	'no-duplicate-variables': noDuplicateVariables,
	'color-hex-case': colorHexCase,
	'declaration-property-value-no-unknown': declarationPropertyValueNoUnknown,
	'container-name-pattern': containerNamePattern,
};
