import { useAppSelector } from '../../hooks/useAppSelector';
import { getRepoBoards } from '../../store/issues/issuesSelectors';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Col, Row, Space, Typography } from 'antd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { RootState } from '../../store/configureStore';
import { updateIssues } from '../../store/issues/issuesSlice';
import { currentRepoNameSelector } from '../../store/repo/repoSelectors';
import IssueCard from '../IssueCard';
import './styles.css';
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
										className='card-space'
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
														<IssueCard issue={issue} provided={provided} />
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
