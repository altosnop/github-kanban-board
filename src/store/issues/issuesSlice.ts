import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const githubToken = process.env.REACT_APP_GITHUB_KEY;

interface Issue {
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
}

interface StatusObject {
	id: number;
	status: string;
	items: Issue[];
}

interface KanbanState {
	items: Issue[];
	boards: StatusObject[];
	loading: boolean;
	error: null;
}

const initialState: KanbanState = {
	items: [],
	boards: [
		{
			id: 1,
			status: 'ToDo',
			items: [],
		},
		{
			id: 2,
			status: 'In Progress',
			items: [],
		},
		{
			id: 3,
			status: 'Done',
			items: [],
		},
	],
	loading: false,
	error: null,
};

export const getIssues = createAsyncThunk(
	'issues/getIssues',
	async (repoName: string | undefined, { rejectWithValue }) => {
		try {
			const response = await axios.get<Issue[]>(
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
		updateIssues: (
			state,
			action: PayloadAction<{
				sourceBoardId: number;
				destinationBoardId: number;
				sourceIndex: number;
				destinationIndex: number;
			}>
		) => {
			const {
				sourceBoardId,
				destinationBoardId,
				sourceIndex,
				destinationIndex,
			} = action.payload;

			const sourceBoard = state.boards.find(
				board => board.id === sourceBoardId
			);
			const destinationBoard = state.boards.find(
				board => board.id === destinationBoardId
			);

			if (sourceBoard && destinationBoard) {
				const [item] = sourceBoard.items.splice(sourceIndex, 1);
				destinationBoard.items.splice(destinationIndex, 0, item);

				item.status = destinationBoard.status;
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(getIssues.pending, (state, _) => {
			state.loading = true;
		});
		builder.addCase(
			getIssues.fulfilled,
			(state, action: PayloadAction<Issue[]>) => {
				const issues = action.payload.map((issue: Issue) => ({
					...issue,
					status:
						issue.state === 'closed'
							? 'Done'
							: issue.assignee
							? 'In Progress'
							: 'ToDo',
				}));
				state.items = [...issues];

				state.boards.map(
					board =>
						(board.items = state.items.filter(
							issue => issue.status === board.status
						))
				);

				state.loading = false;
			}
		);
		builder.addCase(getIssues.rejected, (state, action: PayloadAction<any>) => {
			state.error = action.payload;
			state.loading = false;
		});
	},
});

export const { updateIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
