import { render, screen } from '@testing-library/react';
import { useAppSelector } from '../../hooks/useAppSelector';
import RepoInfo from '.';

jest.mock('../../hooks/useAppSelector', () => ({
	useAppSelector: jest.fn(),
}));

describe('RepoInfo', () => {
	it('should render repository information', () => {
		(useAppSelector as jest.Mock).mockReturnValueOnce({
			name: 'test-repo',
			owner: {
				login: 'test-user',
				html_url: 'https://github.com/test-user',
			},
			html_url: 'https://github.com/test-user/test-repo',
			stargazers_count: 1000,
		});

		render(<RepoInfo />);

		const ownerLink = screen.getByRole('link', { name: 'test-user' });
		expect(ownerLink).toHaveAttribute('href', 'https://github.com/test-user');

		const repoLink = screen.getByRole('link', { name: 'test-repo' });
		expect(repoLink).toHaveAttribute(
			'href',
			'https://github.com/test-user/test-repo'
		);

		const starCount = screen.getByText('1k');
		expect(starCount).toBeInTheDocument();
	});
});
