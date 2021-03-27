import React, { Fragment } from "react";
import Burger from "../components/Burger/Burger";

const BurgerBuilder = (props) => {
  return (
    <Fragment>
      <Burger />
      <div>Burger Controls</div>
    </Fragment>
  );
};

export default BurgerBuilder;
