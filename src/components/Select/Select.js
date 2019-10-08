import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  wrap: {
    marginBottom: theme.spacing(1),
    minWidth: 90
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
  },
  buttonError: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main
  },
  text: {
    color: theme.palette.text.secondary
  },
  textError: {
    color: theme.palette.error.light
  }
}));

export default function Select(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const {id, selectValues, activeValue, handleSetSelect, error, btnStyle} = props;

  const handleOpen = e => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleClick = e => {
    handleSetSelect(id, e.currentTarget.id);
  };

  return (
    <ClickAwayListener onClickAway={ handleClickAway }>
      <div>
        <Button
          id={ id }
          component="div"
          variant="outlined"
          onClick={ handleOpen }
          className={ `${classes.button} ${error ? classes.buttonError : ''}` }
          style={btnStyle}
        >
          { !activeValue
            ? <Typography
              className={ `${classes.text} ${error ? classes.textError : ''}` }
              component="span"
              noWrap>
              { selectValues.default }
            </Typography>
            : <Typography
              component="span"
              noWrap
            >
              {selectValues.items.find(item => item.value === activeValue).label}
            </Typography>
          }
        </Button>
        <Popper
          open={ !!anchorEl }
          anchorEl={ anchorEl }
          transition
          placement="bottom-end"
          modifiers={{
              offset: {
                offset: '0, 1px'
              },
              flip: {
                enabled: false,
              },
          } }
        >
          { ({TransitionProps}) => (
            <Fade { ...TransitionProps } timeout={ 150 }>
              <Paper elevation={ 8 }>
                <List component="div">
                  <ListItem
                    button
                    onClick={ handleClick }
                    selected={ !activeValue }
                  ><Typography component="div">
                    { selectValues.default }
                  </Typography>
                  </ListItem>
                  { selectValues.items.map(item => (
                    <ListItem
                      button
                      id={ item.value }
                      key={ item.value }
                      onClick={ handleClick }
                      selected={ item.value === activeValue }
                    >
                      <Typography component="div">
                      { item.label }
                      </Typography>
                    </ListItem>
                  )) }
                </List>
              </Paper>

            </Fade>
          ) }
        </Popper>
      </div>
    </ClickAwayListener>
  );
}

Select.propTypes = {
  selectValues: PropTypes.object.isRequired,
  btnStyle: PropTypes.object,
  handleSetSelect: PropTypes.func.isRequired,
  activeValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.bool
};