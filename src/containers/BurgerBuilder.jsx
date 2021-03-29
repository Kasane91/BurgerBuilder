import React, { Fragment, useState } from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";

const BurgerBuilder = (props) => {
  const [burger, setBurger] = useState({
    ingredients: { salad: 0, bacon: 0, meat: 0, cheese: 0 },
  });

  return (
    <Fragment>
      <Burger ingredients={burger.ingredients} />
      <BuildControls />
    </Fragment>
  );
};

export default BurgerBuilder;
