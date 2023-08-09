import type {PointInfo} from '../../../../common/types/structures';
import type {NeighbourCellParams} from './types';

export const getNeighbourCellsParams = ({x, y}: PointInfo): NeighbourCellParams[] => [
	{
		neighbourCoords: {
			x: x - 1,
			y: y - 1
		},
		neighbourDirection: 'nw'
	},
	{
		neighbourCoords: {
			x: x,
			y: y - 1
		},
		neighbourDirection: 'n'
	},
	{
		neighbourCoords: {
			x: x + 1,
			y: y - 1
		},
		neighbourDirection: 'ne'
	},
	{
		neighbourCoords: {
			x: x - 1,
			y: y
		},
		neighbourDirection: 'w'
	},
	{
		neighbourCoords: {
			x: x + 1,
			y: y
		},
		neighbourDirection: 'e'
	},
	{
		neighbourCoords: {
			x: x - 1,
			y: y + 1
		},
		neighbourDirection: 'sw'
	},
	{
		neighbourCoords: {
			x: x,
			y: y + 1
		},
		neighbourDirection: 's'
	},
	{
		neighbourCoords: {
			x: x + 1,
			y: y + 1
		},
		neighbourDirection: 'se'
	}
];
