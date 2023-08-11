import {GAME_CREATOR_COLORS, GAME_JOINED_COLORS, GAME_CREATOR_NAMES, GAME_JOINED_NAMES} from './constants'
import type {PlayerInfo} from '../../../../common/types/structures';

export class Player {
	constructor(
		private readonly _name: string,
		private readonly _color: string
	) {}

	static getRandomPlayerInfo(isGameCreator: boolean) {
		const getRandomValue = <T>(values: T[]) => values[Math.floor(Math.random() * values.length)];

		return {
			name: getRandomValue(isGameCreator ? GAME_CREATOR_NAMES : GAME_JOINED_NAMES),
			color: getRandomValue(isGameCreator ? GAME_CREATOR_COLORS : GAME_JOINED_COLORS)
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
