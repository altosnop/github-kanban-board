import { useState } from 'react';
import { useAppSelector } from './hooks/useAppSelector';
import { repoSelector } from './store/repo/repoSelectors';
import { Typography } from 'antd';
import getValueFromUrl from './service/getValueFromUrl';
import SearchBar from './components/SearchBar';
import RepoInfo from './components/RepoInfo';
import Boards from './components/Boards';
import './App.css';

const { Title } = Typography;

function App() {
	const repo = useAppSelector(repoSelector);

	const [repoName, setRepoName] = useState('');

	const handleInputChange = (value: string) => {
		const name = getValueFromUrl(value);
		if (name) {
			setRepoName(name);
		}
	};

	return (
		<>
			<SearchBar value={repoName} onChange={handleInputChange} />

			{repo.name.length > 0 && <RepoInfo />}

			{repo.name.length > 0 ? (
				<Boards />
			) : (
				<Title style={{ textAlign: 'center' }}>Enter repo URL</Title>
			)}
		</>
	);
}

export default App;
