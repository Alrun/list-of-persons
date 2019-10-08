import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import Collapse from '@material-ui/core/Collapse';
import StaffFilterContainer from '../../containers/StaffFilterContainer';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'block'
  },
  top: {
    display: 'flex',
    alignItems: 'center'
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  container: {
    display: 'flex',
  }
}));

export default function StaffTableToolbar(props) {
  const classes = useStyles();
  const [collapse, setCollapse] = useState(false);
  const {handleAddToggle} = props;

  const handleChange = () => {
    setCollapse(prev => !prev);
  };

  return (
    <Toolbar className={ classes.root }>
      <Grid container spacing={2} alignItems="center">

        <Grid item xs>
          <div className={ classes.title }>
            <Typography variant="h6" id="tableTitle">
              Список сотрудников
            </Typography>
          </div>
        </Grid>

        <Grid item xs="auto">
          <Box display="flex">
            <div className={ classes.actions }>
              <Tooltip title="Добавить">
                <IconButton color="primary" onClick={ handleAddToggle(true) }>
                  <AddBoxIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={ classes.actions }>
              <Tooltip title="Фильтр">
                <IconButton onClick={ handleChange }>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Box>

        </Grid>

        <Grid item xs={12}>
          <Collapse in={ !collapse }>
            <div>
              <StaffFilterContainer/>
            </div>
          </Collapse>
        </Grid>

      </Grid>
    </Toolbar>
  );
};

StaffTableToolbar.propTypes = {
  handleAddToggle: PropTypes.func.isRequired
};