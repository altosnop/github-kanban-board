import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store/configureStore';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
