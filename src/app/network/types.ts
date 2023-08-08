import {MessageType} from './enums';
import type {GameHandleCreatedDto, GameHandleJoinedDto, CellHandleFilledDto} from '../../common/types/dto';

export type MessageListener = (message: string) => void;

type GameCreatedMessageDto = {
	type: MessageType.GameCreated;
	payload: GameHandleCreatedDto;
};

type GameJoinedMessageDto = {
	type: MessageType.GameJoined;
	payload: GameHandleJoinedDto;
};

type CellFilledMessageDto = {
	type: MessageType.CellFilled;
	payload: CellHandleFilledDto;
};

export type MessageDto = GameCreatedMessageDto | GameJoinedMessageDto | CellFilledMessageDto;
