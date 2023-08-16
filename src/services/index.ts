import { initStore } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';




export type RootState = ReturnType<typeof initStore.getState>;
export type AppDispatch = typeof initStore.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
