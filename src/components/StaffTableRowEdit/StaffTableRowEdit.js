import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import DatePicker from '../Datepicker';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Select from '../Select/Select';
import TextMask from '../TextMask';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const selectValues = {
  default: 'Должность',
  items: [
    {value: 'driver', label: 'Водитель'},
    {value: 'waiter', label: 'Официант'},
    {value: 'cook', label: 'Повар'}
  ]
};

const useStyles = makeStyles(theme => ({
  cell: {
    paddingTop: theme.spacing(0.9),
    paddingBottom: theme.spacing(0.9),
  },
  help: {
    position: 'absolute',
    top: -15
  },
  button: {
    margin: theme.spacing(0, 0.5),
  },
}));

export default function StaffTableRowEdit(props) {
  const [editRow, setEditRow] = useState(() => props.row);
  const [validName, setValidName] = useState('');
  const [validRole, setValidRole] = useState(false);
  const [validPhone, setValidPhone] = useState('');
  const classes = useStyles();
  const {row, handleEditToggle, handleEditRow, dataResponse} = props;

  const handleChange = name => e => {
    if (e.target.type === 'checkbox') {
      setEditRow({...editRow, [name]: !editRow[name]});
    } else {
      if (e.target.dataset.onlyCyrillic) {
        setValidName('');
        if (!/^[?!,.а-яА-ЯёЁ\s]+$/.test(e.target.value)) return;
      } else {
        setValidPhone('');
      }
      setEditRow({...editRow, [name]: e.target.value});
    }
  };

  const handleSetSelect = (name, value) => {
    setValidRole(false);
    setEditRow({...editRow, [name]: value});
  };

  const handleSetDate = name => date => {
    setEditRow({...editRow, [name]: date});
  };

  const handleConfirm = () => {
    if (editRow.name.length < 5) {
      setValidName('Не менее 5 символов');
    }

    if (!editRow.role) {
      setValidRole(true);
    }
    if (editRow.phone.replace(/[^\d]/g, '').length < 11) {
      setValidPhone('Не менее 10 цифр');
    }

    if (!(editRow.name.length < 5) && !!editRow.role && !(editRow.phone.replace(/[^\d]/g, '').length < 11)) {
      if (!row.id) {
        const idArr = dataResponse.map(item => item.id);
        let id = 0;

        for (let i = 1; i < dataResponse.length + 1; i++) {
          if (idArr.some(item => i === item)) {
            id = dataResponse.length + 1;
          } else {
            id = i;
            break;
          }
        }
        handleEditRow({id, ...editRow});

      } else {
        handleEditRow(editRow);
      }
      handleEditToggle(null)();
    }
  };

  return (
    <TableRow key={ row.id }>
      <TableCell
        component="th"
        className={ classes.cell }
        scope="row"
        style={ {minWidth: 276} }
      >
        <FormControl className={ classes.formControl } error={ !!validName }>
          { !!validName && <FormHelperText className={ classes.help }>{ validName }</FormHelperText> }
          <Input
            placeholder="Введите имя"
            className={ classes.input }
            inputProps={ {
              'data-only-cyrillic': 'true'
            } }
            value={ editRow.name }
            onChange={ handleChange('name') }
          />
        </FormControl>
      </TableCell>
      <TableCell className={ classes.cell }>
        <Select
          id="role"
          selectValues={ selectValues }
          activeValue={ editRow.role }
          handleSetSelect={ handleSetSelect }
          error={ validRole }
          btnStyle={{width: 120}}
        />
      </TableCell>
      <TableCell className={ classes.cell }>
        <FormControl className={ classes.formControl } error={ !!validPhone }>
          { !!validPhone && <FormHelperText className={ classes.help }>{ validPhone }</FormHelperText> }
          <Input
            placeholder="Введите телефон"
            className={ classes.input }
            inputProps={ {
              'data-only-numbers': 'true'
            } }
            inputComponent={ TextMask }
            value={ editRow.phone }
            onChange={ handleChange('phone') }
          />
        </FormControl>
      </TableCell>
      <TableCell align="right" className={ classes.cell } style={ {maxWidth: 175} }>
          <DatePicker
            date={ editRow.birthday }
            handleSetDate={ handleSetDate('birthday') }
          />
      </TableCell>
      <TableCell align="right" className={ classes.cell }>
        <FormControlLabel
          control={
            <Checkbox
              checked={ editRow.isArchive }
              color="primary"
              onChange={ handleChange('isArchive') }
              value="isArchive"
            />
          }
          label="В архиве"
        />
      </TableCell>
      <TableCell align="right" padding="none" className={ classes.cell }>
        <Box display="flex" px={ 1 }>
          <IconButton
            onClick={ handleConfirm }
            className={ classes.button }
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            onClick={ () => handleEditToggle(null)() }
            className={ classes.button }
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}

StaffTableRowEdit.propTypes = {
  row: PropTypes.object.isRequired,
  dataResponse: PropTypes.array,
  handleEditRow: PropTypes.func.isRequired,
  handleEditToggle: PropTypes.func.isRequired
};