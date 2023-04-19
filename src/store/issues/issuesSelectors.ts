import { RootState } from '../configureStore';

export const issuesSelector = (state: RootState) => state.issues.items;
export const issuesLoadingSelector = (state: RootState) => state.issues.loading;
export const boardsSelector = (state: RootState) => state.issues.boards;
