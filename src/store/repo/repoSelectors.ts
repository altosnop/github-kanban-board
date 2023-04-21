import { RootState } from '../configureStore';

export const repoSelector = (state: RootState) => state.repo.item;
export const currentRepoNameSelector = (state: RootState) =>
	state.repo.currentRepoName;
export const repoLoadingSelector = (state: RootState) => state.repo.loading;
