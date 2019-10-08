import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '../../components/Select/Select';

const selectValues = {
  default: 'Все должности',
  items: [
    {value: 'driver', label: 'Водитель'},
    {value: 'waiter', label: 'Официант'},
    {value: 'cook', label: 'Повар'}
  ]
};

const useStyles = makeStyles({
  checkboxLabel: {
    marginRight: 0,
  }
});

export default function StaffFilter(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState(() => props.items);
  const {handleFilterSubmit} = props;

  const handleSet = (id, value) => {
    setSelected({...selected, [id]: {...selected[id], value}});
  };

  return (
    <form action="#" onSubmit={ handleFilterSubmit(selected) }>
      <Grid container spacing={ 2 } alignItems="center">
        <Grid item xs="auto">
          <Select
            id="role"
            selectValues={ selectValues }
            activeValue={ selected.role.value }
            handleSetSelect={ handleSet }
            btnStyle={ {width: 150} }
          />
        </Grid>
        <Grid item xs="auto">
          <FormControlLabel
            className={ classes.checkboxLabel }
            control={
              <Checkbox
                id="isArchive"
                checked={ selected.isArchive.value }
                color="primary"
                onChange={ () => handleSet('isArchive', !selected.isArchive.value) }
                value="isArchive"
              />
            }
            label="В архиве"
          />
        </Grid>
        <Grid item xs={ 12 } sm="auto">
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Применить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}