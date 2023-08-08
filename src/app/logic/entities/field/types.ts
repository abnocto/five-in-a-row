import {Cell} from '../cell';
import type {PointInfo} from '../../../../common/types/structures';

type Direction = 'line' | 'row' | 'diagonal';

export type QueueItem = {
	cell: Cell;
	depth: number;
	direction?: Direction;
};

export type NeighbourCellParams = {
	neighbourCoords: PointInfo;
	neighbourDirection: Direction;
};
