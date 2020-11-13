import { Epic } from 'redux-observable';
import { AppDispatch, AppState } from './state';

export type AppEpic = Epic<AppDispatch, AppDispatch, AppState>;
