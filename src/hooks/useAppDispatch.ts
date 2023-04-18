import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/configureStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
