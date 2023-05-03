import reducer, { updateIssues } from './issuesSlice';

describe('Kanban reducer', () => {
	const initialState = {
		loading: false,
		repos: {},
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	describe('updateIssues', () => {
		const repoName = 'my-repo';
		const sourceBoardId = 1;
		const destinationBoardId = 2;
		const sourceIndex = 0;
		const destinationIndex = 1;

		it('should move an issue from the source board to the destination board', () => {
			const state = {
				loading: false,
				repos: {
					[repoName]: {
						boards: [
							{
								id: sourceBoardId,
								status: 'To Do',
								items: [
									{
										id: 1,
										number: 21,
										assignee: {},
										user: {
											login: 'user',
										},
										state: 'open',
										title: 'title',
										created_at: '01-02-2022',
										comments: 12,
										status: 'To Do',
									},
								],
							},
							{
								id: destinationBoardId,
								status: 'In Progress',
								items: [
									{
										id: 2,
										number: 321,
										assignee: {},
										user: {
											login: 'admin',
										},
										state: 'open',
										title: 'title-2',
										created_at: '05-03-2022',
										comments: 22,
										status: 'In Progress',
									},
								],
							},
						],
						issues: [
							{
								id: 1,
								number: 21,
								assignee: {},
								user: {
									login: 'user',
								},
								state: 'open',
								title: 'title',
								created_at: '01-02-2022',
								comments: 12,
								status: 'To Do',
							},
							{
								id: 2,
								number: 321,
								assignee: {},
								user: {
									login: 'admin',
								},
								state: 'open',
								title: 'title-2',
								created_at: '05-03-2022',
								comments: 22,
								status: 'In Progress',
							},
						],
						previousIssues: [],
					},
				},
			};

			const action = {
				type: updateIssues.type,
				payload: {
					sourceBoardId,
					destinationBoardId,
					sourceIndex,
					destinationIndex,
					repoName,
				},
			};

			const expectedState = {
				loading: false,
				repos: {
					[repoName]: {
						boards: [
							{
								id: sourceBoardId,
								status: 'To Do',
								items: [],
							},
							{
								id: destinationBoardId,
								status: 'In Progress',
								items: [
									{
										id: 2,
										number: 321,
										assignee: {},
										user: {
											login: 'admin',
										},
										state: 'open',
										title: 'title-2',
										created_at: '05-03-2022',
										comments: 22,
										status: 'In Progress',
									},
									{
										id: 1,
										number: 21,
										assignee: {},
										user: {
											login: 'user',
										},
										state: 'open',
										title: 'title',
										created_at: '01-02-2022',
										comments: 12,
										status: 'In Progress',
									},
								],
							},
						],
						issues: [
							{
								id: 1,
								number: 21,
								assignee: {},
								user: {
									login: 'user',
								},
								state: 'open',
								title: 'title',
								created_at: '01-02-2022',
								comments: 12,
								status: 'To Do',
							},
							{
								id: 2,
								number: 321,
								assignee: {},
								user: {
									login: 'admin',
								},
								state: 'open',
								title: 'title-2',
								created_at: '05-03-2022',
								comments: 22,
								status: 'In Progress',
							},
						],
						previousIssues: [],
					},
				},
			};

			expect(reducer(state, action)).toEqual(expectedState);
		});
	});
});
