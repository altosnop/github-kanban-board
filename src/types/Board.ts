import Issue from './Issue';

interface Board {
	id: number;
	status: string;
	items: Issue[];
}

export default Board;
