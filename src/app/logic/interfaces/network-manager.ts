import type {PlayerInfo, PointInfo} from '../../../common/types/structures';

export interface INetworkManager {
	waitForGameCreation(): void;
	sendGameCreatedInfo(hostname: string, playerInfo: PlayerInfo): void;
	sendGameJoinedInfo(playerInfo: PlayerInfo): void;
	sendCellFilledInfo(pointInfo: PointInfo): void;
}
