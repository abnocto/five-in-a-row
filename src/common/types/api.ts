import type {CellFillDto, GameCreateDto} from './dto';
import type {State} from './state';

export type Api = {
	createGame: (dto: GameCreateDto) => void;
	waitForGameCreation: () => void;
	fillCell: (dto: CellFillDto) => void;

	addStateUpdateListener: (listener: (state: State) => void) => void;
};
