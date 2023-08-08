import {Cell} from '../cell';
import {FIELD_SIZE, LINE_SIZE} from './constants';
import {getNeighbourCellsParams} from './get-neighbour-cells-params';
import type {FieldInfo, PointInfo} from '../../../../common/types/structures';
import type {QueueItem} from './types';

export class Field {
	private readonly _cellsMap: Cell[][] = [];

	constructor() {
		this._generateCells();
	}

	fillCell({x, y}: PointInfo, color: string) {
		if (!this._isInFieldBounds({x, y})) {
			throw new Error(`FIELD: Out of field bounds: size = ${FIELD_SIZE}, x = ${x}, y = ${y}`);
		}

		const cell = this._cellsMap[y][x];

		if (cell.isFilled()) {
			throw new Error(`FIELD: Cell is already filled: x = ${x}, y = ${y}`);
		}

		cell.fill(color);
	}

	isCompleted() {
		return this._cellsMap.every((cells) => {
			return cells.every((cell) => cell.isFilled());
		});
	}

	hasFiveInARow() {
		const filledCells = this._cellsMap.reduce((acc, cells) => [
			...acc,
			...cells.filter((cell) => cell.isFilled())
		], []);

		while (filledCells.length) {
			const filledCell: Cell = filledCells.shift()!;
			const visitedCells: Cell[] = [];

			const queue: QueueItem[] = [
				{
					cell: filledCell,
					depth: 1
				}
			];

			while (queue.length) {
				const {cell, depth, direction} = queue.pop()!;
				visitedCells.push(cell);

				if (depth === LINE_SIZE) {
					return true;
				}

				getNeighbourCellsParams(cell.getCoords())
					.filter(({neighbourCoords}) => this._isInFieldBounds(neighbourCoords))
					.forEach(({neighbourCoords, neighbourDirection}) => {
						const neighbourCell = this._cellsMap[neighbourCoords.y][neighbourCoords.x];

						const isAppropriateNeighbourCell = !visitedCells.includes(neighbourCell)
							&& cell.getColor() === neighbourCell.getColor()
							&& (!direction || direction === neighbourDirection);

						if (isAppropriateNeighbourCell) {
							queue.push({
								cell: neighbourCell,
								depth: depth + 1,
								direction: neighbourDirection
							});
						}
					});
			}
		}

		return false;
	}

	toJson(): FieldInfo {
		return {
			cellsMap: this._cellsMap.map((cells) => {
				return cells.map((cell) => cell.toJson());
			})
		};
	}

	private _generateCells() {
		for (let y = 0; y < FIELD_SIZE; y++) {
			this._cellsMap[y] = [];

			for (let x: number = 0; x < FIELD_SIZE; x++) {
				this._cellsMap[y][x] = new Cell(x, y);
			}
		}
	}

	private _isInFieldBounds({x, y}: PointInfo) {
		return x >= 0 && x < FIELD_SIZE && y >= 0 && y < FIELD_SIZE;
	}
}
