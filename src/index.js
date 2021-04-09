import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import burgerReducer from "./store/reducers/burgerReducer";
import orderReducer from "./store/reducers/orderReducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./store/reducers/authReducer";
import createSagaMiddleware from "redux-saga";
import { watchAuth } from "./store/sagas/index";

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
