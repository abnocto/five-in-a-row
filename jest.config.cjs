'use strict';

module.exports = {
	rootDir: 'src',
	testRegex: '.spec.ts$',
	transform: {
		'.ts$': '@swc-node/jest'
	}
};
