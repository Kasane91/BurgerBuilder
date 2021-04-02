import React, { Fragment, useState, useEffect } from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axious-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../containers/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1,
  meat: 1.5,
  cheese: 0.75,
};

const BurgerBuilder = (props) => {
  const [burger, setBurger] = useState({
    ingredients: null,
  });

  const [totalPrice, setTotalPrice] = useState(4);

  const [purchasable, setPurchaseable] = useState(false);

  const [completeOrder, setCompleteOrder] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        console.log(props);
        setBurger({ ingredients: response.data });
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const updatePurchaseStatus = (ingredients) => {
    const total = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((acc, el) => {
        return acc + el;
      }, 0);

    setPurchaseable(total > 0);
  };

  const purchaseOrder = () => {
    setCompleteOrder(true);
  };

  const cancelOrder = () => {
    setCompleteOrder(false);
  };

  const continueOrder = () => {
    setLoading(true);
    // const order = {
    //   ingredients: burger.ingredients,
    //   //Should be calculated server side in a real application
    //   price: totalPrice,
    //   customer: {
    //     name: "Sondre Søråsdekkan",
    //     address: {
    //       street: "Test street 1",
    //       zipCode: "0875",
    //       country: "Norway",
    //     },
    //     email: "test@gmail.com",
    //   },
    //   deliveryMethod: "ASAP",
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     console.log(response);
    //     setLoading(false);
    //     setCompleteOrder(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //     setCompleteOrder(false);
    //   });
    const queryParams = [];
    for (let ingredient in burger.ingredients) {
      queryParams.push(
        encodeURIComponent(ingredient) +
          "=" +
          encodeURIComponent(burger.ingredients[ingredient])
      );
    }
    const queryString = queryParams.join("&");
    props.history.push({ pathname: "/checkout", search: "?" + queryString });
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
  let burgerRender = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  let orderRender = null;

  if (burger.ingredients) {
    burgerRender = (
      <Fragment>
        <Burger ingredients={burger.ingredients} />
        <BuildControls
          onAdd={addIngredientHandler}
          onRemove={removeIngredientHandler}
          disabledInfo={disabledButtonInfo}
          totalPrice={totalPrice}
          isPurchasable={purchasable}
          handlePurchaseOrder={purchaseOrder}
        />
      </Fragment>
    );
    orderRender = (
      <Fragment>
        <OrderSummary
          clickedContinue={continueOrder}
          clickedCancel={cancelOrder}
          ingredients={burger.ingredients}
          totalPrice={totalPrice}
        />
      </Fragment>
    );
  }

  if (loading) {
    orderRender = <Spinner />;
  }

  return (
    <Fragment>
      <Modal show={completeOrder} clicked={cancelOrder}>
        {orderRender}
      </Modal>
      {burgerRender}
    </Fragment>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
