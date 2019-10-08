import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore() {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer(),
    composeEnhancer(
      applyMiddleware(
        thunk
      )
    )
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer());
    });
  }

  return store;
}