import {Status} from '../enums/status';
import type {GameInfo} from './structures';

type InitialState = {
	status: Status.Initial;
};

type WaitingForOpponentState = {
	status: Status.WaitingForOpponent;
};

type WaitingForPlayerState = {
	status: Status.WaitingForPlayer;
	ip: string;
};

type GameState = {
	status: Status.GameInProgress | Status.Finished;
	game: GameInfo;
};

export type State = InitialState | WaitingForOpponentState | WaitingForPlayerState | GameState;
