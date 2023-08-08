import {BrowserWindow} from 'electron';
import {IWindowManager} from './interfaces/window-manager';

export class WindowManager implements IWindowManager {
	private _window: BrowserWindow | null = null;

	constructor(
		private readonly _windowFileRelativePath: string,
		private readonly _preloadFileAbsolutePath: string
	) {}

	createWindow() {
		this._window = new BrowserWindow({
			webPreferences: {
				preload: this._preloadFileAbsolutePath,
				nodeIntegration: true
			}
		});

		this._window.loadFile(this._windowFileRelativePath);
	}

	sendEventToWindow<EventData>(eventType: string, eventData: EventData) {
		this._window?.webContents.send(eventType, eventData);
	}
}
