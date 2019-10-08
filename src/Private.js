import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Box from '@material-ui/core/Box';
import Footer from './components/Footer';
import SidebarMenu from './components/SidebarMenu';

const drawerWidth = 220;
const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    height: '100%'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0.5, 2),
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    maxWidth: '100%',
    transition: theme.transitions.create('max-width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  contentShrink: {
    [theme.breakpoints.up('md')]: {
      maxWidth: `calc(100% - ${ drawerWidth }px)`,
      transition: theme.transitions.create('max-width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  main: {
    flexGrow: 1
  },
  list: {
    width: drawerWidth,
  },
}));

export default function Private(props) {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [menuExpand, setMenuExpand] = useState(false);
  const {component: Component, location, ...rest} = props;

  const handleExpandMenu = open => () => {
    setMenuExpand(open);
  };

  const handleMobileMenu = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileMenu(open);
  };

  return (
    <Route
      { ...rest }
      render={ props => (
        <div className={ classes.wrapper }>
          <div className={ `${ classes.content } ${ menuExpand ? classes.contentShrink : '' }` }>
            <main className={ classes.main }>
              <Container fixed maxWidth="lg">
                { !tablet && <Box my={ 2 }>
                  <Fab
                    size="medium"
                    aria-label="menu"
                    className={ classes.margin }
                    onClick={ handleMobileMenu(true) }
                  >
                    <MenuIcon />
                  </Fab>
                </Box> }
                <Component { ...props } />
              </Container>
            </main>
            <Footer />
          </div>

          { !tablet
            ? <SwipeableDrawer
              open={ mobileMenu }
              onClose={ handleMobileMenu(false) }
              onOpen={ handleMobileMenu(true) }
            >
              <div
                className={ classes.list }
                onClick={ handleMobileMenu(false) }
                onKeyDown={ handleMobileMenu(false) }
              >
                <Box display="flex" m={ 1 } justifyContent="flex-end">
                  <IconButton
                    size="medium"
                    onClick={ handleMobileMenu(false) }
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </Box>
                <Divider />
                <SidebarMenu location={ location } />
              </div>
            </SwipeableDrawer>
            : <Drawer
              anchor="right"
              variant="permanent"
              className={ `${ classes.drawer } ${ menuExpand ? classes.drawerOpen : classes.drawerClose }` }
              classes={ {paper: menuExpand ? classes.drawerOpen : classes.drawerClose} }
              open={ menuExpand }
            >
              <div className={ classes.toolbar }>
                <IconButton
                  edge="start"
                  size="medium"
                  onClick={ menuExpand ? handleExpandMenu(false) : handleExpandMenu(true) }
                >
                  { menuExpand ? <ChevronRightIcon /> : <ChevronLeftIcon /> }
                </IconButton>
              </div>
              <Divider />
              <SidebarMenu location={ location } />
            </Drawer> }
        </div>) }
    />
  );
}

Private.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
};