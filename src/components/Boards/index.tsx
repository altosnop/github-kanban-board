import { useAppSelector } from '../../hooks/useAppSelector';
import { getRepoBoards } from '../../store/issues/issuesSelectors';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Col, Row, Card, Space, Typography } from 'antd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { RootState } from '../../store/configureStore';
import { updateIssues } from '../../store/issues/issuesSlice';
import { currentRepoNameSelector } from '../../store/repo/repoSelectors';
const { Title } = Typography;

const Boards = () => {
	const dispatch = useAppDispatch();

	const currentRepoName = useAppSelector(currentRepoNameSelector);
	const boards = useAppSelector((state: RootState) =>
		getRepoBoards(state, currentRepoName)
	);

	const onDragEnd = (result: any) => {
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		dispatch(
			updateIssues({
				sourceBoardId: Number(source.droppableId),
				destinationBoardId: Number(destination.droppableId),
				sourceIndex: source.index,
				destinationIndex: destination.index,
				repoName: currentRepoName,
			})
		);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Row gutter={16}>
				{boards.map(board => (
					<Col span={8} key={board.id}>
						<Title level={3} style={{ textAlign: 'center' }}>
							{board.status}
						</Title>
						<Droppable droppableId={board.id.toString()} type='ISSUE'>
							{provided => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									style={{ height: '99%' }}
								>
									<Space
										direction='vertical'
										size='middle'
										style={{
											display: 'flex',
											backgroundColor: '#f0ede9',
											border: '1px solid #e3dfda',
											padding: '3% 0',
											height: '100%',
											borderRadius: '4px',
										}}
									>
										{board.items.map((issue, index) => (
											<div
												style={{ width: '90%', margin: '0 auto' }}
												key={issue.id}
											>
												<Draggable
													draggableId={issue.id.toString()}
													index={index}
												>
													{provided => (
														<Card
															key={issue.id}
															title={issue.title}
															hoverable
															bordered={false}
															size='small'
															ref={provided.innerRef}
															{...provided.dragHandleProps}
															{...provided.draggableProps}
														>
															#{issue.number} opened{' '}
															{new Date(issue.created_at).toLocaleString()}{' '}
															<br />
															{issue.user.login} | Comments: {issue.comments}
														</Card>
													)}
												</Draggable>
											</div>
										))}
										{provided.placeholder}
									</Space>
								</div>
							)}
						</Droppable>
					</Col>
				))}
			</Row>
		</DragDropContext>
	);
};

export default Boards;
