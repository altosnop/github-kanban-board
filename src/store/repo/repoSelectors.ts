import { RootState } from '../configureStore';

export const repoSelector = (state: RootState) => state.repo.item;
export const repoLoadingSelector = (state: RootState) => state.repo.loading;
