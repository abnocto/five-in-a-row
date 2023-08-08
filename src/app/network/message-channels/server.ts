import {Server, Socket} from 'net';
import {PORT} from '../constants';
import {IMessageChannel} from '../message-channel';
import type {MessageListener} from '../types';

export class TcpServer implements IMessageChannel {
	private readonly _server: Server;
	private _socket: Socket | null = null;

	constructor(
		private readonly _messageListener: MessageListener
	) {
		this._server = new Server((socket) => {
			this._socket = socket;
			this._handleConnection();
		});

		this._server.listen(PORT, () => {
			console.log(`NETWORK SERVER: listening on port: ${PORT}`);
		});
	}

	sendMessage(message: string) {
		if (!this._socket) {
			throw new Error('SERVER: Socket is not connected');
		}

		console.log(`NETWORK SERVER: sending message: ${message}.`);
		this._socket!.write(message);
	}

	private _handleConnection() {
		console.log(`NETWORK SERVER: client connected: ${this._socket!.remoteAddress}.`);

		this._socket!.on('data', (message: string) => {
			console.log(`NETWORK SERVER: received message: ${message}.`);
			this._messageListener(message);
		});

		this._socket!.on('close', () => {
			console.log('NETWORK SERVER: client disconnected.');
		});

		this._socket!.on('error', (error) => {
			console.log(`NETWORK SERVER: socket error: ${error.stack}.`);
		});
	}
}
