import type {State} from '../../../common/types/state';

export interface IViewManager {
	updateState(state: State): void;
}
