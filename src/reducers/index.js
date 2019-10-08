import { combineReducers } from 'redux';

import staffTable from './staffTable';
import staffFilter from './staffFilter';

export const rootReducer = () => combineReducers({
  staffTable,
  staffFilter
});
