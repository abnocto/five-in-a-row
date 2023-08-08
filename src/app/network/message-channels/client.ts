import {Socket} from 'net';
import {PORT} from '../constants';
import {IMessageChannel} from '../message-channel';
import type {MessageListener} from '../types';

export class TcpClient implements IMessageChannel {
	private readonly _socket: Socket;

	constructor(
		private readonly _hostname: string,
		private readonly _messageListener: MessageListener,
		initialMessage?: string
	) {
		this._socket = new Socket();

		this._socket.connect(PORT, this._hostname, () => {
			this._handleConnection();
			initialMessage && this.sendMessage(initialMessage);
		});
	}

	sendMessage(message: string) {
		if (!this._socket) {
			throw new Error('NETWORK CLIENT: Socket is not connected');
		}

		console.log(`NETWORK CLIENT: sending message: ${message}.`);
		this._socket.write(message);
	}

	private _handleConnection() {
		console.log(`NETWORK CLIENT: client connected: ${this._hostname}.`);

		this._socket.on('data', (message: string) => {
			console.log(`NETWORK CLIENT: received message: ${message}.`);
			this._messageListener(message);
		});

		this._socket.on('close', () => {
			console.log('NETWORK CLIENT: client disconnected.');
		});

		this._socket.on('error', (error) => {
			console.log(`NETWORK CLIENT: socket error: ${error.stack}.`);
		});
	}
}
