import {GameResult} from '../../../../common/enums/game-result';
import {Field} from '../field';
import {Player} from '../player';
import type {PlayerInfo, PointInfo} from '../../../../common/types/structures';

export class Game {
	private _player: Player | null = null;
	private _opponent: Player | null = null;
	private _field: Field | null = null;
	private _isPlayerTurn: boolean | null = null;
	private _result: GameResult | null = null;

	setPlayer({name, color}: PlayerInfo) {
		this._player = new Player(name, color);
	}

	setOpponent({name, color}: PlayerInfo) {
		this._opponent = new Player(name, color);
	}

	start(isPlayerTurn: boolean) {
		this._field = new Field();
		this._isPlayerTurn = isPlayerTurn;
	}

	completePlayerTurn(pointInfo: PointInfo) {
		if (!this._field) {
			throw new Error('GAME: field is not created.');
		}

		if (!this._player) {
			throw new Error('GAME: player is not set.')
		}

		if (!this._isPlayerTurn) {
			throw new Error('GAME: not player\'s turn.');
		}

		this._field.fillCell(pointInfo, this._player.getColor());
		this._completeTurn();
	}

	completeOpponentTurn(pointInfo: PointInfo) {
		if (!this._field) {
			throw new Error('GAME: field is not created.');
		}

		if (!this._opponent) {
			throw new Error('GAME: opponent is not set.')
		}

		if (this._isPlayerTurn) {
			throw new Error('GAME: not opponent\'s turn.');
		}

		this._field.fillCell(pointInfo, this._opponent.getColor());
		this._completeTurn();
	}

	toJson() {
		return {
			player: this._player?.toJson(),
			opponent: this._opponent?.toJson(),
			field: this._field?.toJson(),
			isPlayerTurn: this._isPlayerTurn,
			result: this._result
		};
	}

	private _completeTurn() {
		if (this._field!.isCompleted()) {
			this._result = GameResult.Draw;
			return;
		}

		if (this._field!.hasFiveInARow()) {
			this._result = this._isPlayerTurn
				? GameResult.Victory
				: GameResult.Defeat;
			return;
		}

		this._toggleTurn();
	}

	private _toggleTurn() {
		this._isPlayerTurn = !this._isPlayerTurn;
	}
}
