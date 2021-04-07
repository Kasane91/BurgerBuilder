import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axious-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../containers/withErrorHandler/withErrorHandler";

import * as burgerActions from "../store/actions/index";

const BurgerBuilder = (props) => {
  // const [burger, setBurger] = useState({
  //   ingredients: null,
  // });
  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const [completeOrder, setCompleteOrder] = useState(false);

  const updatePurchaseable = (ingredients) => {
    const total = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((acc, el) => {
        return acc + el;
      }, 0);

    return total > 0;
  };

  const purchaseOrder = () => {
    setCompleteOrder(true);
  };

  const cancelOrder = () => {
    setCompleteOrder(false);
  };

  const continueOrder = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  let disabledButtonInfo = { ...props.ingredients };

  for (let key in disabledButtonInfo) {
    disabledButtonInfo[key] = disabledButtonInfo[key] <= 0;
  }
  let burgerRender = props.error ? (
    <p>Ingredients can't be loaded!</p>
  ) : (
    <Spinner />
  );
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
          isPurchasable={updatePurchaseable(props.ingredients)}
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

// const builder = ;

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingName) => dispatch(burgerActions.addIngredient(ingName)),
    removeIngredient: (ingName) => {
      dispatch(burgerActions.removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(burgerActions.initIngredients());
    },
    onInitPurchase: () => {
      dispatch(burgerActions.purchaseInit());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
