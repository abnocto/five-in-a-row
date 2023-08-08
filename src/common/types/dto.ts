import type {PlayerInfo, PointInfo} from './structures';

export type GameCreateDto = {
	hostname: string;
};

export type GameHandleCreatedDto = {
	playerInfo: PlayerInfo;
};

export type GameHandleJoinedDto = {
	playerInfo: PlayerInfo;
};

export type CellFillDto = {
	pointInfo: PointInfo;
};

export type CellHandleFilledDto = {
	pointInfo: PointInfo;
};
