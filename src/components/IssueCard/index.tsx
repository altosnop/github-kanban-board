import { Card } from 'antd';
import { DraggableProvided } from 'react-beautiful-dnd';
import Issue from '../../types/Issue';

interface IssueCardProps {
	issue: Issue;
	provided: DraggableProvided;
}

const IssueCard = ({ issue, provided }: IssueCardProps) => {
	return (
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
			#{issue.number} opened {new Date(issue.created_at).toLocaleString()}{' '}
			<br />
			{issue.user.login} | Comments: {issue.comments}
		</Card>
	);
};

export default IssueCard;
