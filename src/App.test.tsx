import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { useAppSelector } from './hooks/useAppSelector';
import App from './App';

import '@testing-library/jest-dom/extend-expect';

jest.mock('./hooks/useAppSelector', () => ({
	useAppSelector: jest.fn(),
}));

describe('App', () => {
	beforeEach(() => {
		(useAppSelector as jest.Mock).mockReturnValue({ name: 'mockRepoName' });
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('renders the Enter repo URL title when repo name does not exist', () => {
		(useAppSelector as jest.Mock).mockReturnValue({ name: '' });
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
		expect(screen.getByText('Enter repo URL')).toBeInTheDocument();
	});
});
