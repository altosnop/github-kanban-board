interface Repo {
	name: string;
	html_url: string;
	owner: {
		login: string;
		html_url: string;
	};
	stargazers_count: number;
}

export default Repo;
