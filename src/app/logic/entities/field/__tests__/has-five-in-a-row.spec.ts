import {Field} from '..';
import {FIELD_SIZE} from '../constants';
import {TEST_CASES} from './constants';

describe('#hasFiveInARow', () => {
	let field: Field;

	beforeEach(() => {
		field = new Field();
	});

	TEST_CASES.forEach(({description, expected, test}) => {
		it(description, () => {
			const colorMap = test
				.trim()
				.split(/\s+/)
				.map((row) => row.split(''));

			const checkColorMap = colorMap.length === FIELD_SIZE
				&& colorMap.every((row) => row.length === FIELD_SIZE);

			if (!checkColorMap) {
				throw new Error('Invalid test case: wrong field dimensions.');
			}

			colorMap.forEach((row, y) => {
				row.forEach((color, x) => {
					if (color !== '.') {
						field.fillCell({x, y}, color);
					}
				});
			});

			expect(field.hasFiveInARow()).toEqual(expected);
		});
	});
});
