import {COLORS, NAMES} from './constants'
import type {PlayerInfo} from '../../../../common/types/structures';

export class Player {
	constructor(
		private readonly _name: string,
		private readonly _color: string
	) {}

	static getRandomPlayerInfo() {
		const getRandomValue = <T>(values: T[]) => values[Math.floor(Math.random() * values.length)];

		return {
			name: getRandomValue(NAMES),
			color: getRandomValue(COLORS)
		};
	}

	getColor() {
		return this._color;
	}

	toJson(): PlayerInfo {
		return {
			name: this._name,
			color: this._color
		};
	}
}
