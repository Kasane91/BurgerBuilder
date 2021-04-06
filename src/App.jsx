import React from "react";
import "./index.css";
import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./store/reducers/reducer";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const store = createStore(Reducer);

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" exact component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
