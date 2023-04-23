import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Repo from '../../types/Repo';

const githubToken = process.env.REACT_APP_GITHUB_KEY;

interface RepoState {
	item: Repo;
	currentRepoName: string;
	loading: boolean;
	error: null;
}

const initialState: RepoState = {
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

export const setRepo = createAsyncThunk(
	'repo/setRepo',
	async (repoName: string | undefined, { rejectWithValue }) => {
		try {
			const response = await axios.get<Repo>(
				`https://api.github.com/repos/${repoName}`,
				{
					headers: {
						Authorization: `Bearer ${githubToken}`,
						'Content-Type': 'application/json',
					},
				}
			);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const repoSlice = createSlice({
	name: 'repo',
	initialState,
	reducers: {
		setCurrentRepoName: (state, action: PayloadAction<string>) => {
			state.currentRepoName = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(setRepo.pending, (state, _) => {
			state.loading = true;
		});
		builder.addCase(setRepo.fulfilled, (state, action: PayloadAction<Repo>) => {
			state.item = action.payload;
			state.loading = false;
		});
		builder.addCase(setRepo.rejected, (state, action: PayloadAction<any>) => {
			state.error = action.payload;
			state.loading = false;
		});
	},
});

export const { setCurrentRepoName } = repoSlice.actions;

export default repoSlice.reducer;
