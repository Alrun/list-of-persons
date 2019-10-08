import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles(theme => ({
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  }
}));

export default function StaffTablePagination(props) {
  const classes = useStyles();
  const {rows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage} = props;

  return (
    <TablePagination
      classes={{
        toolbar: classes.toolbar
      }}
      rowsPerPageOptions={[10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
      labelRowsPerPage={<span style={{fontSize: '1rem'}}>Показывать по:</span>}
      page={page}
      backIconButtonProps={{
        'aria-label': 'previous page',
      }}
      nextIconButtonProps={{
        'aria-label': 'next page',
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}

StaffTablePagination.propTypes = {
  rows: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired
};