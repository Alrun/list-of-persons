import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssessmentIcon from '@material-ui/icons/Assessment';

function ListItemLink(props) {
  const {icon, primary, to, pathname} = props;

  const renderLink = React.useMemo(() =>
      React.forwardRef((itemProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <RouterLink to={ to } { ...itemProps } innerRef={ ref } />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={ renderLink } selected={ pathname === to }>
        { icon ? <ListItemIcon>{ icon }</ListItemIcon> : null }
        <ListItemText primary={ primary } />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function SidebarMenu(props) {
  const {location: {pathname}} = props;

  return (
    <List>
      <ListItemLink to="/staff" primary="Сотрудники" icon={ <SupervisorAccountIcon /> } pathname={ pathname } />
      <ListItemLink to="/add" primary="Отчеты" icon={ <AssessmentIcon /> } pathname={ pathname } />
    </List>
  );
}

SidebarMenu.propTypes = {
  location: PropTypes.object.isRequired
};
