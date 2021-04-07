import React, { useEffect } from "react";
import "./index.css";
import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

import { connect } from "react-redux";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import AuthComponent from "./containers/Auth/Auth";

import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

function App(props) {
  const { onTryAutoSignUp } = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />,
      <Route path="/auth" exact component={AuthComponent} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />,
        <Route path="/auth" exact component={AuthComponent} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
