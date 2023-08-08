import path from 'path';
import {app} from 'electron';
import {WindowManager} from './electron/window/window-manager';
import {IWindowManager} from './electron/window/interfaces/window-manager';
import {INetworkManager} from './app/logic/interfaces/network-manager';
import {IViewManager} from './app/logic/interfaces/view-manager';
import {IInteractor} from './app/logic/interfaces/interactor';
import {Interactor} from './app/logic/interactor';
import {NetworkManager} from './app/network/network-manager';
import {ViewManager} from './app/view-manager';
import {Controller} from './app/controller';

app.whenReady().then(() => {
	const windowManager: IWindowManager = new WindowManager('./static/index.html', path.join(__dirname, 'preload.js'));
	const networkManager: INetworkManager = new NetworkManager();
	const viewManager: IViewManager = new ViewManager(windowManager);
	const interactor: IInteractor = new Interactor(networkManager, viewManager);
	const controller = new Controller(interactor);

	controller.addGameListeners();

	windowManager.createWindow();
});

app.on('window-all-closed', () => {
	app.quit();
});

process.on('uncaughtException', (error) => {
	console.log(`APP: ${error.stack}.`);
});
