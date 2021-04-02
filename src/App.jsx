import React from "react";
import "./index.css";
import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Router, Switch, NavLink } from "react-router-dom";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Router path="/">
            <BurgerBuilder />
          </Router>
          <Router path="/checkout">
            <Checkout />
          </Router>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
