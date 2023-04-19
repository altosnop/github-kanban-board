import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { issuesSelector } from './store/issues/issuesSelectors';
import { setRepo } from './store/repo/repoSlice';
import getValueFromUrl from './service/getValueFromUrl';
import SearchBar from './components/SearchBar';
import RepoInfo from './components/RepoInfo';
import Boards from './components/Boards';
import './App.css';

function App() {
	const dispatch = useAppDispatch();
	const [url, setUrl] = useState('');

	const todoIssues = useAppSelector(issuesSelector);

	const handleInputChange = (value: string) => {
		setUrl(value);
	};

	useEffect(() => {
		const repoName = getValueFromUrl(url);

		if (todoIssues.length > 0) {
			dispatch(setRepo(repoName));
		}
	}, [dispatch, todoIssues.length, url]);

	return (
		<>
			<SearchBar value={url} onChange={handleInputChange} />

			{todoIssues.length > 0 && <RepoInfo />}

			{/* {todoIssues.length > 0 && <Boards />} */}
			<Boards />
		</>
	);
}

export default App;
