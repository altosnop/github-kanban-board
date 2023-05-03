import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/configureStore';
import Boards from '.';

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

describe('Boards', () => {
	test('renders without throwing an error', () => {
		render(
			<Provider store={store}>
				<Boards />
			</Provider>
		);
	});
});
