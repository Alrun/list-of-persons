import React from 'react';
import StaffTableContainer from '../../containers/StaffTableContainer';
import Box from '@material-ui/core/Box';

export default function PageStaff() {
  return (
    <div>
      <Box component="h1">Сотрудники</Box>
      <StaffTableContainer />
    </div>
  );
}