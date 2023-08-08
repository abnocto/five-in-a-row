import {IInteractor} from './logic/interfaces/interactor';
import {EventManager} from '../electron/event/event-manager';
import {GAME_CREATE, GAME_WAIT_FOR_CREATION, GAME_HANDLE_CREATED, GAME_HANDLE_JOINED, CELL_FILL,
	CELL_HANDLE_FILLED} from '../common/constants/events';
import type {GameCreateDto, GameHandleCreatedDto, GameHandleJoinedDto, CellFillDto,
	CellHandleFilledDto} from '../common/types/dto';

export class Controller {
	constructor(
		private readonly _interactor: IInteractor
	) {}

	addGameListeners() {
		this._addGameCreateListener();
		this._addGameWaitForCreationListener();
		this._addGameHandleCreatedListener();
		this._addGameHandleJoinedListener();

		this._addCellFillListener();
		this._addCellHandleFilledListener();
	}

	private _addGameCreateListener() {
		EventManager.addIpcMainEventListener<GameCreateDto>(GAME_CREATE, (dto) => {
			this._interactor.createGame(dto.hostname);
		});
	}

	private _addGameWaitForCreationListener() {
		EventManager.addIpcMainEventListener(GAME_WAIT_FOR_CREATION, () => {
			this._interactor.waitForGameCreation();
		});
	}

	private _addGameHandleCreatedListener() {
		EventManager.addEmitterEventListener<GameHandleCreatedDto>(GAME_HANDLE_CREATED, (dto) => {
			this._interactor.handleCreatedGame(dto.playerInfo);
		});
	}

	private _addGameHandleJoinedListener() {
		EventManager.addEmitterEventListener<GameHandleJoinedDto>(GAME_HANDLE_JOINED, (dto) => {
			this._interactor.handleJoinedGame(dto.playerInfo);
		});
	}

	private _addCellFillListener() {
		EventManager.addIpcMainEventListener<CellFillDto>(CELL_FILL, (dto) => {
			this._interactor.fillCell(dto.pointInfo);
		});
	}

	private _addCellHandleFilledListener() {
		EventManager.addEmitterEventListener<CellHandleFilledDto>(CELL_HANDLE_FILLED, (dto) => {
			this._interactor.handleFilledCell(dto.pointInfo);
		});
	}
}
