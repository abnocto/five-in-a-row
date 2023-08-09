import {Cell} from '../cell';
import type {PointInfo} from '../../../../common/types/structures';

type Direction = 'nw' | 'n' | 'ne' | 'w' | 'e' | 'sw' | 's' | 'se';

export type QueueItem = {
	cell: Cell;
	depth: number;
	direction?: Direction;
};

export type NeighbourCellParams = {
	neighbourCoords: PointInfo;
	neighbourDirection: Direction;
};
