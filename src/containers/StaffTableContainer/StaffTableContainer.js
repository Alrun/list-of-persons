import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchHomeData,
  staffTableDeleteRow,
  staffTableEditRow, staffTableFilter
} from '../../actions/staffTable';
import { Box } from '@material-ui/core';
import StaffTable from '../../components/StaffTable';

export default function StaffTableContainer() {
  const state = useSelector(state => state.staffTable);
  const filterState = useSelector(state => state.staffFilter);
  const dispatch = useDispatch();
  const {dataResponse, filteredData, isLoading, textError} = state.staffTable;
  const {items} = filterState.staffFilter;

  useEffect(() => {
    if (!dataResponse.length) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, dataResponse.length]);

  const handleEditRow = row => {
    let filterList = [];

    for (let prop in items) {
      if (items.hasOwnProperty(prop)) {
        filterList.push({
          [prop]: {
            type: items[prop].type,
            value: items[prop].value,
          }
        });
      }
    }
    dispatch(staffTableEditRow(row));
    dispatch(staffTableFilter(filterList));
  };

  const handleDeleteRow = id => {
    dispatch(staffTableDeleteRow(id));
  };

  if (isLoading) {
    return (
      <Box color="primary.main">Загрузка...</Box>
    )
  }

  if (textError) {
    return (
      <Box color="error.main">{textError}</Box>
    )
  }

  return (
      <StaffTable
        filteredData={filteredData}
        dataResponse={dataResponse}
        handleEditRow={handleEditRow}
        handleDeleteRow={handleDeleteRow}
      />
  );
}