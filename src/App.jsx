import React from "react";
import "./index.css";
import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
