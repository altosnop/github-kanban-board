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

export default Issue;
