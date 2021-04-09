import React, { Suspense, useEffect } from "react";
import "./index.css";
import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Spinner from "./components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const AuthComponent = React.lazy(() => import("./containers/Auth/Auth"));

function App(props) {
  const { onTryAutoSignUp } = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />,
      <Route
        path="/auth"
        exact
        render={() => (
          <Suspense fallback={<Spinner />}>
            <AuthComponent />
          </Suspense>
        )}
      />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />,
        <Route
          path="/auth"
          exact
          render={() => (
            <Suspense fallback={<Spinner />}>
              <AuthComponent />
            </Suspense>
          )}
        />
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
