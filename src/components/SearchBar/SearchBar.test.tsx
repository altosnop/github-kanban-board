import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './../../store/configureStore';
import SearchBar from '.';

import '@testing-library/jest-dom/extend-expect';

describe('SearchBar', () => {
	let mockOnChange: jest.Mock;

	beforeEach(() => {
		mockOnChange = jest.fn();
	});

	test('renders the component', () => {
		render(
			<Provider store={store}>
				<SearchBar value='' onChange={mockOnChange} />
			</Provider>
		);

		expect(screen.getByPlaceholderText('Enter repo URL')).toBeInTheDocument();
	});

	test('calls onChange event when input value changes', () => {
		render(
			<Provider store={store}>
				<SearchBar value='' onChange={mockOnChange} />
			</Provider>
		);

		const input = screen.getByPlaceholderText('Enter repo URL');
		fireEvent.change(input, { target: { value: 'test change' } });

		expect(input).toHaveAttribute('value', 'test change');
		expect(mockOnChange).toHaveBeenCalledTimes(1);
	});
});
