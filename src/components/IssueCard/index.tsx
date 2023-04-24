import { Card } from 'antd';
import { DraggableProvided } from 'react-beautiful-dnd';
import Issue from '../../types/Issue';

interface IssueCardProps {
	issue: Issue;
	provided: DraggableProvided;
}

const IssueCard = ({ issue, provided }: IssueCardProps) => {
	const newDate: Date = new Date();
	const issueDate: Date = new Date(issue.created_at);

	const diffInDays = Math.ceil(
		Math.abs(newDate.getTime() - issueDate.getTime()) / (1000 * 3600 * 24)
	);

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
			#{issue.number} opened {diffInDays}
			{diffInDays === 1 ? ` day ago` : ` days ago`}
			<br />
			{issue.user.login} | Comments: {issue.comments}
		</Card>
	);
};

export default IssueCard;
