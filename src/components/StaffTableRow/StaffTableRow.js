import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import StaffTableRowEdit from '../StaffTableRowEdit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const job = role => {
  switch (role) {
    case 'driver': return 'Водитель';
    case 'cook': return 'Повар';
    case 'waiter': return 'Официант';
    default: return '';
  }
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(0, 0.5),
  },
  confirmRoot: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  }
}));

export default function StaffTableRow(props) {
  const classes = useStyles();
  const {
    row,
    handleEditRow,
    handleConfirmDelete,
    handleDelete,
    showConfirmDelete,
    openEdit,
    handleEditToggle
  } = props;

  return (
    <>
      {
        openEdit
        ? <StaffTableRowEdit
          handleEditRow={ handleEditRow }
          handleEditToggle={ handleEditToggle }
          row={ row }
        />
        : showConfirmDelete
          ? <TableRow className={classes.root}>
            <TableCell colSpan="6" className={classes.confirmRoot}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Box mr={2}>
                  <Typography >Дейсвительно хотите удалить?</Typography>
                </Box>
                  <IconButton
                    onClick={ handleDelete(row.id) }
                    className={ classes.button }
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    onClick={ handleConfirmDelete(null) }
                    className={ classes.button }
                  >
                    <CloseIcon />
                  </IconButton>
              </Box>
            </TableCell>
          </TableRow>
          : <TableRow hover>
            <TableCell component="th" scope="row" style={ {minWidth: 250} }>{ row.name }</TableCell>
            <TableCell style={ {minWidth: 185} }>{ job(row.role) }</TableCell>
            <TableCell style={ {minWidth: 170} }>{ row.phone }</TableCell>
            <TableCell align="right" style={ {minWidth: 170} }>{ row.birthday }</TableCell>
            <TableCell align="left" style={ {minWidth: 150} }>{ row.isArchive ? 'В архиве' : '' }</TableCell>
            <TableCell align="right">
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  color="primary"
                  onClick={ handleEditToggle(row.id) }
                  className={ classes.button }
                  size="small"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={ handleConfirmDelete(row.id) }
                  className={ classes.button }
                  size="small"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
      }
    </>
  );
}

StaffTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  handleEditRow: PropTypes.func.isRequired,
  handleConfirmDelete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditToggle: PropTypes.func.isRequired,
  showConfirmDelete: PropTypes.bool.isRequired,
};
