import {contextBridge} from 'electron';
import {EventManager} from './electron/event/event-manager';
import {API_KEY} from './common/constants/api';
import {GAME_CREATE, GAME_WAIT_FOR_CREATION, CELL_FILL, GAME_UPDATE_STATE}
	from './common/constants/events';
import type {Api} from './common/types/api';

const api: Api = {
	createGame: (dto) => EventManager.sendIpcRendererEvent(GAME_CREATE, dto),
	waitForGameCreation: () => EventManager.sendIpcRendererEvent(GAME_WAIT_FOR_CREATION),
	fillCell: (dto) => EventManager.sendIpcRendererEvent(CELL_FILL, dto),

	addStateUpdateListener: (listener) => EventManager.addIpcRendererEventListener(GAME_UPDATE_STATE, listener)
}

contextBridge.exposeInMainWorld(API_KEY, api);
