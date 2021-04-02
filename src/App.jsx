import React from "react";
import "./index.css";
import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
