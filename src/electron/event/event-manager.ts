import {EventEmitter} from 'events';
import {ipcMain, ipcRenderer} from 'electron';

type EventListener<EventData> = (eventData: EventData) => void;

export class EventManager {
	private static readonly _eventEmitter = new EventEmitter();

	static addIpcMainEventListener<EventData>(eventType: string, eventListener: EventListener<EventData>) {
		ipcMain.on(eventType, (event, eventData: EventData) => eventListener(eventData));
	}

	static addIpcRendererEventListener<EventData>(eventType: string, eventListener: EventListener<EventData>) {
		ipcRenderer.on(eventType, (event, eventData: EventData) => eventListener(eventData));
	}

	static sendIpcRendererEvent<EventData>(eventType: string, eventData?: EventData) {
		ipcRenderer.send(eventType, eventData);
	}

	static addEmitterEventListener<EventData>(eventType: string, eventListener: EventListener<EventData>) {
		EventManager._eventEmitter.on(eventType, (eventData: EventData) => eventListener(eventData));
	}

	static sendEmitterEvent<EventData>(eventType: string, eventData?: EventData) {
		EventManager._eventEmitter.emit(eventType, eventData);
	}
}
