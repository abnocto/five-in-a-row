import {GameResult} from '../enums/game-result';

export type PlayerInfo = {
	name: string;
	color: string;
};

export type PointInfo = {
	x: number;
	y: number;
};

export type CellInfo = {
	point: PointInfo;
	color: string | null;
};

export type FieldInfo = {
	cellsMap: CellInfo[][];
	lastFilledCell: CellInfo | null;
};

export type GameInfo = {
	player: PlayerInfo;
	opponent: PlayerInfo;
	field: FieldInfo;
	isPlayerTurn: boolean;
	result: GameResult | null;
};
