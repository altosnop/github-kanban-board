import React, { useState } from 'react';
import { getIssues } from './../../store/issues/issuesSlice';
import { useAppDispatch } from './../../hooks/useAppDispatch';
import { Input } from 'antd';
import { setCurrentRepoName, setRepo } from '../../store/repo/repoSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { currentRepoNameSelector } from '../../store/repo/repoSelectors';
const { Search } = Input;

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
	const dispatch = useAppDispatch();
	const [inputValue, setInputValue] = useState(value);

	const currentRepoName = useAppSelector(currentRepoNameSelector);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onChange(e.target.value);
	};

	const onSearch = () => {
		if (value && value !== currentRepoName) {
			dispatch(getIssues(value));
			dispatch(setCurrentRepoName(value));
		}
		dispatch(setRepo(value));
	};

	return (
		<Search
			placeholder='Enter repo URL'
			allowClear
			size='large'
			value={inputValue}
			onChange={handleInputChange}
			onSearch={onSearch}
			onPressEnter={onSearch}
		/>
	);
};

export default SearchBar;
