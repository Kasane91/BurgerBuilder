import React, { Fragment, useState } from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1,
  meat: 1.5,
  cheese: 0.75,
};

const BurgerBuilder = (props) => {
  const [burger, setBurger] = useState({
    ingredients: { salad: 0, bacon: 0, meat: 0, cheese: 0 },
  });

  const [totalPrice, setTotalPrice] = useState(4);

  const addIngredientHandler = (type) => {
    const oldValue = burger.ingredients[type];
    const newValue = oldValue + 1;
    const updatedIngredients = { ...burger };
    updatedIngredients.ingredients[type] = newValue;
    setBurger(updatedIngredients);

    setTotalPrice((prevValue) => {
      return prevValue + INGREDIENT_PRICES[type];
    });
  };

  const removeIngredientHandler = (type) => {
    const oldValue = burger.ingredients[type];
    if (oldValue >= 1) {
      const newValue = oldValue - 1;
      const updatedIngredients = { ...burger };
      updatedIngredients.ingredients[type] = newValue;
      setBurger(updatedIngredients);

      setTotalPrice((prevValue) => {
        return prevValue - INGREDIENT_PRICES[type];
      });
    }
  };

  let disabledButtonInfo = { ...burger.ingredients };

  for (let key in disabledButtonInfo) {
    disabledButtonInfo[key] = disabledButtonInfo[key] <= 0;
  }

  console.log(disabledButtonInfo);

  return (
    <Fragment>
      <Burger ingredients={burger.ingredients} />
      <BuildControls
        onAdd={addIngredientHandler}
        onRemove={removeIngredientHandler}
        disabledInfo={disabledButtonInfo}
        totalPrice={totalPrice}
      />
    </Fragment>
  );
};

export default BurgerBuilder;
