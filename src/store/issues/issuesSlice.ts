import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Issue from '../../types/Issue';
import Board from '../../types/Board';
import axios from 'axios';

const githubToken = process.env.REACT_APP_GITHUB_KEY;

interface KanbanState {
	loading: boolean;
	repos: {
		[repoName: string]: {
			boards: Board[];
			issues: Issue[];
			previousIssues: Issue[];
		};
	};
}

const initialState: KanbanState = {
	loading: false,
	repos: {},
};

const getMergedIssues = (
	previousIssues: Issue[],
	newIssues: Issue[]
): Issue[] => {
	const mergedIssues: Issue[] = [];

	previousIssues.forEach(prevIssue => {
		const matchingNewIssue = newIssues.find(
			newIssue => newIssue.id === prevIssue.id
		);
		if (matchingNewIssue) {
			mergedIssues.push({
				...prevIssue,
				status: matchingNewIssue.status,
			});
		} else {
			mergedIssues.push(prevIssue);
		}
	});

	newIssues.forEach(newIssue => {
		const matchingPrevIssue = previousIssues.find(
			prevIssue => prevIssue.id === newIssue.id
		);
		if (!matchingPrevIssue) {
			mergedIssues.push(newIssue);
		}
	});

	return mergedIssues;
};

export const getIssues = createAsyncThunk(
	'issues/getIssues',
	async (repoName: string, { getState, rejectWithValue }) => {
		try {
			const state = getState() as { issues: KanbanState };
			const repos = state.issues.repos;
			const isNewRepo = !repos[repoName];

			const response = await axios.get<Issue[]>(
				`https://api.github.com/repos/${repoName}/issues?state=all&per_page=10`,
				{
					headers: {
						Authorization: `Bearer ${githubToken}`,
						'Content-Type': 'application/json',
					},
				}
			);

			const newIssues = response.data.map((issue: Issue) => ({
				...issue,
				status:
					issue.state === 'closed'
						? 'Done'
						: issue.assignee
						? 'In Progress'
						: 'ToDo',
			}));

			let issues: Issue[] = [];
			let boards: Board[] = [];

			if (isNewRepo) {
				issues = newIssues;
				boards = [
					{
						id: 1,
						status: 'ToDo',
						items: issues.filter(issue => issue.status === 'ToDo'),
					},
					{
						id: 2,
						status: 'In Progress',
						items: issues.filter(issue => issue.status === 'In Progress'),
					},
					{
						id: 3,
						status: 'Done',
						items: issues.filter(issue => issue.status === 'Done'),
					},
				];
			} else {
				const previousIssues = repos[repoName].previousIssues;
				issues = getMergedIssues(previousIssues, newIssues);
				boards = repos[repoName].boards;
			}

			return {
				repoName,
				issues,
				boards,
				previousIssues: newIssues,
			};
		} catch (err: any) {
			return rejectWithValue(err.response.data);
		}
	}
);

const kanbanSlice = createSlice({
	name: 'issues',
	initialState,
	reducers: {
		updateIssues: (
			state,
			action: PayloadAction<{
				sourceBoardId: number;
				destinationBoardId: number;
				sourceIndex: number;
				destinationIndex: number;
				repoName: string;
			}>
		) => {
			const {
				sourceBoardId,
				destinationBoardId,
				sourceIndex,
				destinationIndex,
				repoName,
			} = action.payload;

			const sourceBoard = state.repos[repoName].boards.find(
				board => board.id === sourceBoardId
			);
			const destinationBoard = state.repos[repoName].boards.find(
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
		builder
			.addCase(getIssues.pending, state => {
				state.loading = true;
			})
			.addCase(getIssues.fulfilled, (state, action) => {
				const { repoName, issues, boards } = action.payload;
				state.loading = false;
				state.repos[repoName] = { issues, boards, previousIssues: issues };
			})
			.addCase(getIssues.rejected, state => {
				state.loading = false;
			});
	},
});

export const { updateIssues } = kanbanSlice.actions;

export default kanbanSlice.reducer;
