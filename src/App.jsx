import React, { useEffect } from "react";
import "./index.css";
import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

import { connect } from "react-redux";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import AuthComponent from "./containers/Auth/Auth";

import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

function App() {
  // const { onTryAutoSignUp } = props;

  // useEffect(() => {
  //   onTryAutoSignUp();
  // }, []);

  return (
    <div>
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
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default App;
