import React, { useEffect, useState } from 'react';
import './App.css';

import { Input, Col, Row, Card, Space, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { getIssues } from './store/issues/issuesSlice';
import {
	doneIssuesSelector,
	inProgressIssuesSelector,
	toDoIssuesSelector,
} from './store/issues/issuesSelectors';
import axios from 'axios';

type TRepo = {
	name: string;
	html_url: string;
	owner: {
		login: string;
		html_url: string;
	};
	stargazers_count: number;
};

const { Search } = Input;
const { Title, Link, Text } = Typography;

const regexUrl = (url: string) => {
	const regex = /(?<=github\.com\/)[^\/]+\/[^\/]+/;
	const result = url.match(regex);

	if (result) {
		return result[0];
	}
};

function App() {
	const dispatch = useAppDispatch();

	const [url, setUrl] = useState('');
	const [repo, setRepo] = useState<TRepo>({
		name: '',
		html_url: '',
		owner: {
			login: '',
			html_url: '',
		},
		stargazers_count: 0,
	});

	const todoIssues = useAppSelector(toDoIssuesSelector);
	const inProgressIssues = useAppSelector(inProgressIssuesSelector);
	const doneIssues = useAppSelector(doneIssuesSelector);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const onSearch = () => {
		const regex = /(?<=github\.com\/)[^\/]+\/[^\/]+/;
		const result = url.match(regex);

		if (result) {
			dispatch(getIssues(result[0]));
		}
	};

	useEffect(() => {
		const repoName = regexUrl(url);

		if (todoIssues.length > 0) {
			axios
				.get(`https://api.github.com/repos/${repoName}`, {
					headers: {
						Authorization: `Bearer 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`,
						'Content-Type': 'application/json',
					},
				})
				.then(({ data }) => setRepo(data));
		}
	}, [todoIssues.length, url]);

	return (
		<>
			<Search
				placeholder='Enter repo URL'
				allowClear
				size='large'
				value={url}
				onChange={handleInputChange}
				onSearch={onSearch}
				onPressEnter={onSearch}
			/>
			<Space style={{ marginTop: '1%' }}>
				<Link href={repo?.owner.html_url} target='_blank' className='repo-text'>
					{repo?.owner.login}
				</Link>
				<Text className='repo-text'>{'>'}</Text>
				<Link href={repo?.html_url} target='_blank' className='repo-text'>
					{repo?.name}
				</Link>
				<StarFilled style={{ color: 'orange' }} className='repo-text' />
				<Text className='repo-text'>
					{Math.round(repo.stargazers_count / 1000) + 'k'}
				</Text>
			</Space>
			<Row gutter={16}>
				<Col span={8}>
					<Title level={3} style={{ textAlign: 'center' }}>
						ToDo
					</Title>
					<Space
						direction='vertical'
						size='middle'
						style={{
							display: 'flex',
							backgroundColor: '#f0ede9',
							border: '1px solid #e3dfda',
							padding: '3% 0',
							height: '100%',
							borderRadius: '4px',
						}}
					>
						{todoIssues.map(issue => (
							<Card
								key={issue.id}
								title={issue.title}
								hoverable
								bordered={false}
								size='small'
								style={{ width: '90%', margin: '0 auto' }}
							>
								#{issue.number} opened{' '}
								{new Date(issue.created_at).toLocaleString()} <br />
								{issue.user.login} | Comments: {issue.comments}
							</Card>
						))}
					</Space>
				</Col>
				<Col span={8}>
					<Title level={3} style={{ textAlign: 'center' }}>
						In Progress
					</Title>
					<Space
						direction='vertical'
						size='middle'
						style={{
							display: 'flex',
							border: '1px solid #e3dfda',
							backgroundColor: '#f0ede9',
							padding: '3% 0',
							height: '100%',
							borderRadius: '4px',
						}}
					>
						{inProgressIssues.map(issue => (
							<Card
								key={issue.id}
								title={issue.title}
								hoverable
								bordered={false}
								size='small'
								style={{ width: '90%', margin: '0 auto' }}
							>
								#{issue.number} opened{' '}
								{new Date(issue.created_at).toLocaleString()} <br />
								{issue.user.login} | Comments: {issue.comments}
							</Card>
						))}
					</Space>
				</Col>
				<Col span={8}>
					<Title level={3} style={{ textAlign: 'center' }}>
						Done
					</Title>
					<Space
						direction='vertical'
						size='middle'
						style={{
							display: 'flex',
							border: '1px solid #e3dfda',
							backgroundColor: '#f0ede9',
							padding: '3% 0',
							height: '100%',
							borderRadius: '4px',
						}}
					>
						{doneIssues.map(issue => (
							<Card
								key={issue.id}
								title={issue.title}
								hoverable
								bordered={false}
								size='small'
								style={{ width: '90%', margin: '0 auto' }}
							>
								#{issue.number} opened{' '}
								{new Date(issue.created_at).toLocaleString()} <br />
								{issue.user.login} | Comments: {issue.comments}
							</Card>
						))}
					</Space>
				</Col>
			</Row>
		</>
	);
}

export default App;
