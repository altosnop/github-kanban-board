import { RootState } from '../configureStore';

export const issuesSelector = (state: RootState) => state.kanbanBoard.issues;

export const toDoIssuesSelector = (state: RootState) =>
	state.kanbanBoard.toDoIssues;
export const inProgressIssuesSelector = (state: RootState) =>
	state.kanbanBoard.inProgressIssues;
export const doneIssuesSelector = (state: RootState) =>
	state.kanbanBoard.doneIssues;

export const loadingSelector = (state: RootState) => state.kanbanBoard.loading;
