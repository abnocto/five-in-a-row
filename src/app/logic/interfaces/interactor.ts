import type {PlayerInfo, PointInfo} from '../../../common/types/structures';

export interface IInteractor {
	createGame(hostname: string): void;
	waitForGameCreation(): void;
	handleCreatedGame(playerInfo: PlayerInfo): void;
	handleJoinedGame(playerInfo: PlayerInfo): void;
	fillCell(pointInfo: PointInfo): void;
	handleFilledCell(pointInfo: PointInfo): void;
}
