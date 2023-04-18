import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const githubToken = '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';

type TIssue = {
	id: number;
	number: number;
	assignee: {};
	user: {
		login: string;
	};
	state: string;
	title: string;
	created_at: string;
	comments: number;
	status?: string;
};

interface KanbanState {
	issues: TIssue[];
	toDoIssues: TIssue[];
	inProgressIssues: TIssue[];
	doneIssues: TIssue[];
	loading: boolean;
	error: null;
}

const initialState: KanbanState = {
	issues: [],
	toDoIssues: [],
	inProgressIssues: [],
	doneIssues: [],
	loading: false,
	error: null,
};

export const getIssues = createAsyncThunk(
	'issues/getIssues',
	async (repoName: string, { rejectWithValue }) => {
		try {
			const response = await axios.get<TIssue[]>(
				`https://api.github.com/repos/${repoName}/issues?state=all&per_page=100`,
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

const issuesSlice = createSlice({
	name: 'kanbanBoard',
	initialState,
	reducers: {
		setIssues: state => {
			console.log('setIssues');
		},
	},
	extraReducers: builder => {
		builder.addCase(getIssues.pending, (state, _) => {
			state.loading = true;
		});
		builder.addCase(
			getIssues.fulfilled,
			(state, action: PayloadAction<TIssue[]>) => {
				const issues = action.payload.map((issue: TIssue) => ({
					...issue,
					status:
						issue.state === 'closed'
							? 'Done'
							: issue.assignee
							? 'In Progress'
							: 'ToDo',
				}));
				state.issues = [...issues];
				state.toDoIssues = state.issues.filter(
					issue => issue.status === 'ToDo'
				);
				state.inProgressIssues = state.issues.filter(
					issue => issue.status === 'In Progress'
				);
				state.doneIssues = state.issues.filter(
					issue => issue.status === 'Done'
				);
				state.loading = false;
			}
		);
		builder.addCase(getIssues.rejected, (state, action: PayloadAction<any>) => {
			state.error = action.payload;
		});
	},
});

export const { setIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
