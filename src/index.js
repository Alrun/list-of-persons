import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();

const Render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <App/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

Render();

// Hot reloading
if (module.hot) {
  module.hot.accept('./App', () => {
    Render();
  });
}

Render.propTypes = {
  store: PropTypes.object.isRequired
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
