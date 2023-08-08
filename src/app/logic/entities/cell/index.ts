import {Point} from '../point';
import type {CellInfo} from '../../../../common/types/structures';

export class Cell {
	private readonly _point: Point;
	private _color: string | null = null;

	constructor(x: number, y: number) {
		this._point = new Point(x, y);
	}

	getColor() {
		return this._color;
	}

	getCoords() {
		return this._point.toJson();
	}

	isFilled() {
		return !!this._color;
	}

	fill(color: string) {
		this._color = color;
	}

	toJson(): CellInfo {
		return {
			point: this._point.toJson(),
			color: this._color
		};
	}
}
