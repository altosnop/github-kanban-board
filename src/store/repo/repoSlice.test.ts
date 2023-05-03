import { configureStore } from '@reduxjs/toolkit';
import repoSlice, { setRepo, setCurrentRepoName } from './repoSlice';

describe('repo slice', () => {
	let store;

	beforeEach(() => {
		store = configureStore({
			reducer: {
				repo: repoSlice,
			},
		});
	});

	const initialState = {
		item: {
			name: '',
			html_url: '',
			owner: {
				login: '',
				html_url: '',
			},
			stargazers_count: 0,
		},
		currentRepoName: '',
		loading: false,
		error: null,
	};

	it('should handle initial state', () => {
		expect(repoSlice(undefined, { type: '' })).toEqual(initialState);
	});

	it('should set currentRepoName', () => {
		const action = setCurrentRepoName('myRepo');
		const state = { ...initialState };
		const newState = repoSlice(state, action);
		expect(newState.currentRepoName).toEqual('myRepo');
	});

	it('should handle setCurrentRepoName action', () => {
		const repoName = 'test-repo';
		store.dispatch(setCurrentRepoName(repoName));
		const { currentRepoName } = store.getState().repo;
		expect(currentRepoName).toEqual(repoName);
	});

	it('should handle setRepo.pending action', () => {
		const repoName = 'test-repo';
		store.dispatch(setRepo(repoName));
		const { loading } = store.getState().repo;
		expect(loading).toEqual(true);
	});
});
