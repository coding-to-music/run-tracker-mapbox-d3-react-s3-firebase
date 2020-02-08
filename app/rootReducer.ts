import { combineReducers } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import routeReducer, { loadingReducer } from '../features/Map/routeSlice';
import notificationReducer from '../features/Map/notificationSlice';

const rootReducer = combineReducers({
  route: undoable(routeReducer, {
    limit: 10,
  }),
  loading: loadingReducer,
  notifications: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
