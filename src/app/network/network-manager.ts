import {GAME_HANDLE_CREATED, GAME_HANDLE_JOINED, CELL_HANDLE_FILLED} from '../../common/constants/events';
import {EventManager} from '../../electron/event/event-manager';
import {INetworkManager} from '../logic/interfaces/network-manager';
import {IMessageChannel} from './message-channel';
import {TcpServer} from './message-channels/server';
import {TcpClient} from './message-channels/client';
import {MessageType} from './enums';
import type {CellHandleFilledDto, GameHandleCreatedDto, GameHandleJoinedDto} from '../../common/types/dto';
import type {PlayerInfo, PointInfo} from '../../common/types/structures';
import type {MessageDto} from './types';

export class NetworkManager implements INetworkManager {
	private _messageChannel: IMessageChannel | null = null;

	waitForGameCreation() {
		this._messageChannel = new TcpServer(this._handleMessage);
	}

	sendGameCreatedInfo(hostname: string, playerInfo: PlayerInfo) {
		this._messageChannel = new TcpClient(hostname, this._handleMessage, this._getGameCreatedMessage(playerInfo));
	}

	sendGameJoinedInfo(playerInfo: PlayerInfo) {
		if (!this._messageChannel) {
			throw new Error('NETWORK MANAGER: channel is closed.')
		}

		this._messageChannel.sendMessage(this._getGameJoinedMessage(playerInfo));
	}

	sendCellFilledInfo(pointInfo: PointInfo) {
		if (!this._messageChannel) {
			throw new Error('NETWORK MANAGER: channel is closed.')
		}

		this._messageChannel.sendMessage(this._getCellFilledMessage(pointInfo));
	}

	private _getGameCreatedMessage(playerInfo: PlayerInfo) {
		const messageDto: MessageDto = {
			type: MessageType.GameCreated,
			payload: {
				playerInfo
			}
		};

		return JSON.stringify(messageDto);
	}

	private _getGameJoinedMessage(playerInfo: PlayerInfo) {
		const messageDto: MessageDto = {
			type: MessageType.GameJoined,
			payload: {
				playerInfo
			}
		};

		return JSON.stringify(messageDto);
	}

	private _getCellFilledMessage(pointInfo: PointInfo) {
		const messageDto: MessageDto = {
			type: MessageType.CellFilled,
			payload: {
				pointInfo
			}
		};

		return JSON.stringify(messageDto);
	}

	private _handleMessage(message: string) {
		const messageDto: MessageDto = JSON.parse(message);

		switch (messageDto.type) {
			case MessageType.GameCreated:
				EventManager.sendEmitterEvent<GameHandleCreatedDto>(GAME_HANDLE_CREATED, messageDto.payload);
				break;
			case MessageType.GameJoined:
				EventManager.sendEmitterEvent<GameHandleJoinedDto>(GAME_HANDLE_JOINED, messageDto.payload);
				break;
			case MessageType.CellFilled:
				EventManager.sendEmitterEvent<CellHandleFilledDto>(CELL_HANDLE_FILLED, messageDto.payload);
				break;
			default:
				throw new Error(`NETWORK MANAGER: Unknown message: ${message}.`);
		}
	}
}
