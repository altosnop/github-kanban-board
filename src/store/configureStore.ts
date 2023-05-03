import { configureStore, combineReducers } from '@reduxjs/toolkit';
import issuesSlice from './issues/issuesSlice';
import repoSlice from './repo/repoSlice';
import storage from 'redux-persist/lib/storage';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const reducers = combineReducers({
	issues: issuesSlice,
	repo: repoSlice,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['issues'],
};

export const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV === 'development',
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
