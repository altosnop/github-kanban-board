import { render, screen } from '@testing-library/react';
import { DraggableProvided } from 'react-beautiful-dnd';
import IssueCard from '.';
import Issue from '../../types/Issue';

import '@testing-library/jest-dom/extend-expect';

const mockIssue: Issue = {
	id: 123,
	title: 'Mock issue title',
	number: 1,
	user: {
		login: 'mockUser',
	},
	created_at: '2022-04-30T20:00:00Z',
	comments: 2,
	state: 'open',
	assignee: {},
};

const mockProvided: DraggableProvided = {
	innerRef: jest.fn(),
	draggableProps: {
		'data-rbd-draggable-context-id': '',
		'data-rbd-draggable-id': '',
	},
	dragHandleProps: {
		'data-rbd-drag-handle-draggable-id': '',
		'data-rbd-drag-handle-context-id': '',
		tabIndex: -1,
		role: 'DragHandle',
		'aria-describedby': '',
		draggable: false,
		onDragStart: jest.fn(),
	},
};

describe('IssueCard', () => {
	test('renders without throwing an error', () => {
		render(<IssueCard issue={mockIssue} provided={mockProvided} />);
	});
	test('renders the correct title', () => {
		render(<IssueCard issue={mockIssue} provided={mockProvided} />);
		const titleElement = screen.getByText('Mock issue title');
		expect(titleElement).toBeInTheDocument();
	});
});
