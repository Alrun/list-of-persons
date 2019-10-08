import React, { useState } from 'react';
import SidebarMenu from '../SidebarMenu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  root: {
    display: 'flex',
    flex: '1 0 auto'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${ drawerWidth }px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
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
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column'
  },
  mainContainer: {
    flex: '1 0 auto'
  },
  list: {
    width: 200,
  },
}));

export default function Sidebar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const {location, mobileMenu, handleMobileMenu} = props;
  const tablet = useMediaQuery(theme.breakpoints.up('md'));

  const handleToggleMenu = open => () => {
    setMenuOpen(open);
  };

  return (
    <>
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
            <Box mx={ 2 } my={ 1 }>
              <IconButton
                size="medium"
                onClick={ handleMobileMenu(false) }
                className={ classes.menuButton }
              >
                <ChevronLeftIcon />
              </IconButton>
            </Box>
            <Divider />

              <SidebarMenu location={ location } />

          </div>
        </SwipeableDrawer>
        : <Drawer
          variant="permanent"
          className={ `${ classes.drawer } ${ menuOpen ? classes.drawerOpen : classes.drawerClose }` }
          classes={ {paper: menuOpen ? classes.drawerOpen : classes.drawerClose} }
          open={ menuOpen }
        >
          <div className={ classes.toolbar }>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={ handleToggleMenu(true) }
              edge="start"
              className={ `${ classes.menuButton } ${ menuOpen ? classes.hide : '' }` }
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              onClick={ handleToggleMenu(false) }
              className={ `${ classes.menuButton } ${ !menuOpen ? classes.hide : '' }` }
            >
              { theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon /> }
            </IconButton>

          </div>
          <Divider />
          <SidebarMenu location={ location } />
        </Drawer>
      }
    </>
  );
}

// GitHubIcon.propTypes = {
//   size: PropTypes.number
// };