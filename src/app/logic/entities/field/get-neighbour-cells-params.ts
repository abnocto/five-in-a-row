import type {PointInfo} from '../../../../common/types/structures';
import type {NeighbourCellParams} from './types';

export const getNeighbourCellsParams = ({x, y}: PointInfo): NeighbourCellParams[] => [
	{
		neighbourCoords: {
			x: x - 1,
			y: y - 1
		},
		neighbourDirection: 'diagonal'
	},
	{
		neighbourCoords: {
			x: x,
			y: y - 1
		},
		neighbourDirection: 'row'
	},
	{
		neighbourCoords: {
			x: x + 1,
			y: y - 1
		},
		neighbourDirection: 'diagonal'
	},
	{
		neighbourCoords: {
			x: x - 1,
			y: y
		},
		neighbourDirection: 'line'
	},
	{
		neighbourCoords: {
			x: x + 1,
			y: y
		},
		neighbourDirection: 'line'
	},
	{
		neighbourCoords: {
			x: x - 1,
			y: y + 1
		},
		neighbourDirection: 'diagonal'
	},
	{
		neighbourCoords: {
			x: x,
			y: y + 1
		},
		neighbourDirection: 'row'
	},
	{
		neighbourCoords: {
			x: x + 1,
			y: y + 1
		},
		neighbourDirection: 'diagonal'
	}
];
