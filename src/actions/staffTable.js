import { C } from './index';
import { staffList } from '../mock';

export const staffTableFetchSuccess = response => ({
  type: C.STAFF_TABLE_FETCH_SUCCESS,
  response
});

export const staffTableLoading = bool => ({
  type: C.STAFF_TABLE_LOADING,
  bool
});

export const staffTableError = msg => ({
  type: C.STAFF_TABLE_ERROR,
  msg
});

export const staffTableFilter = list => ({
  type: C.STAFF_TABLE_FILTER,
  list
});

export const staffTableEditRow = row => ({
  type: C.STAFF_TABLE_EDIT_ROW,
  row
});

export const staffTableDeleteRow = id => ({
  type: C.STAFF_TABLE_DELETE_ROW,
  id
});

export const fetchHomeData = () => {
  return async dispatch => {

    let promise = await new Promise(resolve => {
      setTimeout(() => resolve(staffList), 1000);
    });

    dispatch(staffTableLoading(true));

    try {
      let response = await promise;
      dispatch(staffTableFetchSuccess(response));
      dispatch(staffTableFilter([]));
    } catch (err) {
      dispatch(staffTableError(err));
      console.error(err);
    }

    dispatch(staffTableLoading(false));
  };
};