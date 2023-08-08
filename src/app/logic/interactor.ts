import ip from 'ip';
import {Status} from '../../common/enums/status';
import {IInteractor} from './interfaces/interactor';
import {INetworkManager} from './interfaces/network-manager';
import {IViewManager} from './interfaces/view-manager';
import {Game} from './entities/game';
import {Player} from './entities/player';
import type {GameInfo, PlayerInfo, PointInfo} from '../../common/types/structures';
import type {State} from '../../common/types/state';

export class Interactor implements IInteractor {
	private _status: Status;
	private readonly _game: Game;

	constructor(
		private readonly _networkManager: INetworkManager,
		private readonly _viewManager: IViewManager
	) {
		this._status = Status.Initial;
		this._game = new Game();
	}

	createGame(hostname: string) {
		if (this._status !== Status.Initial) {
			throw new Error('INTERACTOR: expected Initial status.');
		}

		this._status = Status.WaitingForOpponent;

		const playerInfo = Player.getRandomPlayerInfo();
		this._game.setPlayer(playerInfo);

		this._networkManager.sendGameCreatedInfo(hostname, playerInfo);
		this._viewManager.updateState(this._getState());
	}

	waitForGameCreation() {
		if (this._status !== Status.Initial) {
			throw new Error('INTERACTOR: expected Initial status.');
		}

		this._status = Status.WaitingForPlayer;

		const playerInfo = Player.getRandomPlayerInfo();
		this._game.setPlayer(playerInfo);

		this._networkManager.waitForGameCreation();
		this._viewManager.updateState(this._getState());
	}

	handleCreatedGame(opponentInfo: PlayerInfo) {
		if (this._status !== Status.WaitingForPlayer) {
			throw new Error('INTERACTOR: expected WaitingForPlayer status.');
		}

		this._status = Status.GameInProgress;

		this._game.setOpponent(opponentInfo);
		this._game.start(false);

		this._networkManager.sendGameJoinedInfo(this._game.toJson().player!);
		this._viewManager.updateState(this._getState());
	}

	handleJoinedGame(opponentInfo: PlayerInfo) {
		if (this._status !== Status.WaitingForOpponent) {
			throw new Error('INTERACTOR: expected WaitingForOpponent status.');
		}

		this._status = Status.GameInProgress;

		this._game.setOpponent(opponentInfo);
		this._game.start(true);

		this._viewManager.updateState(this._getState());
	}

	fillCell(pointInfo: PointInfo) {
		if (this._status !== Status.GameInProgress) {
			throw new Error('INTERACTOR: expected GameInProgress status.');
		}

		this._game.completePlayerTurn(pointInfo);

		this._networkManager.sendCellFilledInfo(pointInfo);
		this._viewManager.updateState(this._getState());
	}

	handleFilledCell(pointInfo: PointInfo) {
		if (this._status !== Status.GameInProgress) {
			throw new Error('INTERACTOR: expected GameInProgress status.');
		}

		this._game.completeOpponentTurn(pointInfo);

		this._viewManager.updateState(this._getState());
	}

	private _getState(): State {
		switch (this._status) {
			case Status.Initial:
			case Status.WaitingForOpponent:
				return {
					status: this._status
				};

			case Status.WaitingForPlayer:
				return {
					status: this._status,
					ip: ip.address()
				};

			case Status.GameInProgress:
			case Status.Finished:
				return {
					status: this._status,
					game: this._game.toJson() as GameInfo
				};

			default:
				throw new Error('INTERACTOR: unknown status');
		}
	}
}
