import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState('1900-01-01');
  const {date, handleSetDate} = props;

  useEffect(() => {
    !date ? setSelectedDate('2000-01-01') : setSelectedDate(Date.parse(new Date(date.replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1'))));
  }, [date]);

  const handleDateChange = date => {
    setSelectedDate(date);
    handleSetDate(format(date, 'dd:MM:yyyy'));
  };

  return (
    <MuiPickersUtilsProvider utils={ DateFnsUtils } locale={ ruLocale }>
      <KeyboardDatePicker
        okLabel={ 'Подтвердить' }
        cancelLabel={ 'Отменить' }
        invalidDateMessage={ 'Неверный формат' }
        maxDate={ new Date() }
        id="date-picker-dialog"
        format="dd.MM.yyyy"
        value={ selectedDate }
        onChange={ handleDateChange }
        KeyboardButtonProps={ {
          'aria-label': 'change date',
        } }
        // InputProps={{
        //   style: {fontSize: '3rem'}
        // }}
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  handleSetDate: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired
};