import React, { useState } from 'react';
import { getIssues } from './../../store/issues/issuesSlice';
import { useAppDispatch } from './../../hooks/useAppDispatch';
import getValueFromUrl from './../../service/getValueFromUrl';
import { Input } from 'antd';
const { Search } = Input;

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
	const dispatch = useAppDispatch();
	const [inputValue, setInputValue] = useState(value);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onChange(e.target.value);
	};

	const onSearch = () => {
		const repoName = getValueFromUrl(value);
		dispatch(getIssues(repoName));
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
