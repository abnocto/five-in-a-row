import {IWindowManager} from '../electron/window/interfaces/window-manager';
import {GAME_UPDATE_STATE} from '../common/constants/events';
import {IViewManager} from './logic/interfaces/view-manager';
import type {State} from '../common/types/state';

export class ViewManager implements IViewManager {
	constructor(
		private readonly _windowManager: IWindowManager
	) {}

	updateState(state: State): void {
		this._windowManager.sendEventToWindow(GAME_UPDATE_STATE, state);
	}
}
