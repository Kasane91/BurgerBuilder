import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axious-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../containers/withErrorHandler/withErrorHandler";
import * as actionTypes from "../store/actions";

const BurgerBuilder = (props) => {
  // const [burger, setBurger] = useState({
  //   ingredients: null,
  // });

  const [totalPrice, setTotalPrice] = useState(4);

  const [purchasable, setPurchaseable] = useState(false);

  const [completeOrder, setCompleteOrder] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  // useEffect(() => {
  //   // axios
  //   //   .get("/ingredients.json")
  //   //   .then((response) => {
  //   //     setBurger({ ingredients: response.data });
  //   //   })
  //   //   .catch((err) => {
  //   //     setError(err);
  //   //   });
  //   setBurger({ ingredients: props.ingredients });
  // }, []);

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

    const queryParams = [];
    for (let ingredient in props.ingredients) {
      queryParams.push(
        encodeURIComponent(ingredient) +
          "=" +
          encodeURIComponent(props.ingredients[ingredient])
      );
    }
    queryParams.push("totalPrice=" + totalPrice);
    const queryString = queryParams.join("&");
    props.history.push({ pathname: "/checkout", search: "?" + queryString });
  };

  // const addIngredientHandler = (type) => {
  //   const oldValue = burger.ingredients[type];
  //   const newValue = oldValue + 1;
  //   const updatedIngredients = { ...burger };
  //   updatedIngredients.ingredients[type] = newValue;
  //   setBurger(updatedIngredients);

  //   setTotalPrice((prevValue) => {
  //     return prevValue + INGREDIENT_PRICES[type];
  //   });

  //   updatePurchaseStatus(updatedIngredients.ingredients);
  // };

  // const removeIngredientHandler = (type) => {
  //   const oldValue = burger.ingredients[type];
  //   if (oldValue >= 1) {
  //     const newValue = oldValue - 1;
  //     const updatedIngredients = { ...burger };
  //     updatedIngredients.ingredients[type] = newValue;
  //     setBurger(updatedIngredients);

  //     setTotalPrice((prevValue) => {
  //       return prevValue - INGREDIENT_PRICES[type];
  //     });
  //     updatePurchaseStatus(updatedIngredients.ingredients);
  //   }
  // };

  let disabledButtonInfo = { ...props.ingredients };

  for (let key in disabledButtonInfo) {
    disabledButtonInfo[key] = disabledButtonInfo[key] <= 0;
  }
  let burgerRender = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  let orderRender = null;

  if (props.ingredients) {
    burgerRender = (
      <Fragment>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          onAdd={props.addIngredient}
          onRemove={props.removeIngredient}
          disabledInfo={disabledButtonInfo}
          totalPrice={props.totalPrice}
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
          ingredients={props.ingredients}
          totalPrice={props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

// const builder = ;

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
      }),
    removeIngredient: (ingName) => {
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
