import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import Private from './Private';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PageStaff from './components/PageStaff';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff'
    },
  },
  overrides: {}
});

export default function App() {
  return (
    <Router basename="/pf">
      <MuiThemeProvider theme={ theme }>
        <CssBaseline />
        <Switch>
          <Redirect exact from="/" to="/staff" />
          <Private path="/staff" component={ PageStaff } />
          <Private path="/add" component={ () => <Box component="h1">Отчеты</Box> } />
          <Private path="" component={ () => <Box component="h1">404</Box> } />
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}