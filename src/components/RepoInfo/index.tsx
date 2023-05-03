import { useAppSelector } from '../../hooks/useAppSelector';
import {
	repoLoadingSelector,
	repoSelector,
} from '../../store/repo/repoSelectors';
import { Typography, Space, Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';
const { Link, Text } = Typography;

const RepoInfo = () => {
	const repo = useAppSelector(repoSelector);
	const loading = useAppSelector(repoLoadingSelector);

	return (
		<Space style={{ marginTop: '1%' }}>
			{loading ? (
				<Spin />
			) : (
				<>
					<Link
						href={repo?.owner.html_url}
						target='_blank'
						style={{ fontSize: '17px' }}
					>
						{repo?.owner.login}
					</Link>
					<Text style={{ fontSize: '17px' }}>{'>'}</Text>
					<Link
						href={repo?.html_url}
						target='_blank'
						style={{ fontSize: '17px' }}
					>
						{repo?.name}
					</Link>
					<Text style={{ fontSize: '17px' }}>
						<StarFilled style={{ color: 'orange', fontSize: '17px' }} />
						{Math.round(repo.stargazers_count / 1000) + 'k'}
					</Text>
				</>
			)}
		</Space>
	);
};

export default RepoInfo;
