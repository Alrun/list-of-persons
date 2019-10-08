import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StaffTableHead from '../StaffTableHead';
import StaffTableToolbar from '../StaffTableToolbar';
import StaffTableRow from '../StaffTableRow';
import StaffTablePagination from '../StaffTablePagination';
import StaffTableRowEdit from '../StaffTableRowEdit';

function desc(a, b, orderBy) {
  if (orderBy === 'birthday') {
    const dateParse = item => Date.parse(new Date(item.replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1')));

    if (dateParse(b[orderBy]) < dateParse(a[orderBy])) {
      return -1;
    }
    if (dateParse(b[orderBy]) > dateParse(a[orderBy])) {
      return 1;
    }
    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
    paddingTop: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function StaffTable(props) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editRow, setEditRow] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const {filteredData, dataResponse, handleEditRow, handleDeleteRow} = props;

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleConfirmDelete = (id) => () => {
    setShowConfirmDelete(id);
  };

  const handleDelete = (id) => () => {
    handleDeleteRow(id);
  };

  const handleAddToggle = bool => () => {
    if (bool) setEditRow(null);
    setShowAdd(bool);
  };

  const handleEditToggle = (id) => () => {
    setEditRow(id);
    setShowAdd(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <StaffTableToolbar
          handleAddToggle={ handleAddToggle }
        />
        <div className={ classes.tableWrapper }>
          <Table
            className={ classes.table }
            aria-labelledby="tableTitle"
            size="medium"
          >
            <StaffTableHead
              classes={ classes }
              order={ order }
              orderBy={ orderBy }
              onRequestSort={ handleRequestSort }
            />
            <TableBody>
              { showAdd
                ? <>
                  <StaffTableRowEdit
                    handleEditRow={ handleEditRow }
                    handleEditToggle={ handleAddToggle }
                    dataResponse={dataResponse}
                    row={{name: '', role: '', phone: '', birthday: '01.01.2000', isArchive: false}}
                  />
                  { stableSort(filteredData, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => (
                      <StaffTableRow
                        key={ row.id }
                        row={ row }
                        openEdit={editRow === row.id}
                        handleEditToggle={handleEditToggle}
                        handleEditRow={ handleEditRow }
                        showConfirmDelete={showConfirmDelete === row.id}
                        handleDelete={ handleDelete }
                        handleConfirmDelete={ handleConfirmDelete }
                      />
                    ))
                  }
                </>
                : <>
                  { stableSort(filteredData, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <StaffTableRow
                          key={ row.id }
                          row={ row }
                          openEdit={editRow === row.id}
                          handleEditToggle={handleEditToggle}
                          handleEditRow={ handleEditRow }
                          handleDelete={ handleDelete }
                          showConfirmDelete={showConfirmDelete === row.id}
                          handleConfirmDelete={ handleConfirmDelete }
                        />
                      );
                    }) }
                </>
              }

              { emptyRows > 0 && (
                <TableRow style={ {height: 53 * emptyRows} }>
                  <TableCell colSpan={ 6 } />
                </TableRow>
              ) }
            </TableBody>
          </Table>
        </div>
        <StaffTablePagination
          rows={ filteredData }
          rowsPerPage={ rowsPerPage }
          page={ page }
          handleChangePage={ handleChangePage }
          handleChangeRowsPerPage={ handleChangeRowsPerPage }
        />
      </Paper>
    </div>
  );
}

StaffTable.propTypes = {
  dataResponse: PropTypes.array.isRequired,
  filteredData: PropTypes.array.isRequired,
  handleEditRow: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired
};