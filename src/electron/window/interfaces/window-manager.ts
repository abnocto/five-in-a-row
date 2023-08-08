export interface IWindowManager {
	createWindow(): void;
	sendEventToWindow<EventData>(eventType: string, eventData: EventData): void;
}
