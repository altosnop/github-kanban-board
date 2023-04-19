import { configureStore } from '@reduxjs/toolkit';
import issuesSlice from './issues/issuesSlice';
import repoSlice from './repo/repoSlice';

const store = configureStore({
	reducer: {
		issues: issuesSlice,
		repo: repoSlice,
	},
	devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
