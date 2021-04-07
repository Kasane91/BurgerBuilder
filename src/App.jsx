import React, { useEffect } from "react";
import "./index.css";
import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import burgerReducer from "./store/reducers/burgerReducer";
import orderReducer from "./store/reducers/orderReducer";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import AuthComponent from "./containers/Auth/Auth";
import authReducer from "./store/reducers/authReducer";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer,
  auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

function App(props) {
  const { onTryAutoSignUp } = props;

  useEffect(() => {
    onTryAutoSignUp();
  }, []);

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/auth" exact component={AuthComponent} />
              <Route path="/orders" exact component={Orders} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
