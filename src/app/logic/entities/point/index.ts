import type {PointInfo} from '../../../../common/types/structures';

export class Point {
	constructor(
		private readonly _x: number,
		private readonly _y: number
	) {}

	toJson(): PointInfo {
		return {
			x: this._x,
			y: this._y
		};
	}
}
