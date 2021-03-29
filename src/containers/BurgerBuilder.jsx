import React, { Fragment, useState } from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";

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

  const [purchasable, setPurchaseable] = useState(false);

  const [completeOrder, setCompleteOrder] = useState(false);

  const updatePurchaseStatus = (ingredients) => {
    const total = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((acc, el) => {
        return acc + el;
      }, 0);

    setPurchaseable(total > 0);
    console.log(total);
  };

  const updateOrderStatus = () => {
    setCompleteOrder(true);
  };

  const cancelOrder = () => {
    setCompleteOrder(false);
  };

  const addIngredientHandler = (type) => {
    const oldValue = burger.ingredients[type];
    const newValue = oldValue + 1;
    const updatedIngredients = { ...burger };
    updatedIngredients.ingredients[type] = newValue;
    setBurger(updatedIngredients);

    setTotalPrice((prevValue) => {
      return prevValue + INGREDIENT_PRICES[type];
    });

    updatePurchaseStatus(updatedIngredients.ingredients);
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
      updatePurchaseStatus(updatedIngredients.ingredients);
    }
  };

  let disabledButtonInfo = { ...burger.ingredients };

  for (let key in disabledButtonInfo) {
    disabledButtonInfo[key] = disabledButtonInfo[key] <= 0;
  }

  return (
    <Fragment>
      <Burger ingredients={burger.ingredients} />
      <Modal show={completeOrder} handleCancelOrder={cancelOrder}>
        <OrderSummary ingredients={burger.ingredients} />
      </Modal>
      <BuildControls
        onAdd={addIngredientHandler}
        onRemove={removeIngredientHandler}
        disabledInfo={disabledButtonInfo}
        totalPrice={totalPrice}
        isPurchasable={purchasable}
        order={updateOrderStatus}
      />
    </Fragment>
  );
};

export default BurgerBuilder;
