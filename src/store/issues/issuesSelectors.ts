import { createSelector } from 'reselect';
import { RootState } from '../configureStore';

export const getRepoState = (state: RootState) => state.issues.repos;
export const issuesLoadingSelector = (state: RootState) => state.issues.loading;

export const getRepoBoards = createSelector(
	[getRepoState, (_: RootState, repoName: string) => repoName],
	(repos, repoName) => repos[repoName]?.boards || []
);

export const getRepoIssues = createSelector(
	[getRepoState, (_: RootState, repoName: string) => repoName],
	(repos, repoName) => repos[repoName]?.issues || []
);
