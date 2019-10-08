import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { staffTableFilter } from '../../actions/staffTable';
import StaffFilter from '../../components/StaffFilter';
import { staffFilterSetValue } from '../../actions/staffFilter';

export default function StaffFilterContainer() {
  const state = useSelector(state => state.staffFilter);
  const dispatch = useDispatch();
  const {items} = state.staffFilter;

  const handleFilterSubmit = list => e => {
    e.preventDefault();
    let filterList = [];

    for (let prop in list) {
      if (list.hasOwnProperty(prop)) {
        filterList.push({
          [prop]: {
            type: list[prop].type,
            value: list[prop].value,
          }
        });
      }
    }

    dispatch(staffTableFilter(filterList));
    dispatch(staffFilterSetValue(list));
  };

  return (
    <StaffFilter
      items={items}
      handleFilterSubmit={handleFilterSubmit}
    />
  )
}