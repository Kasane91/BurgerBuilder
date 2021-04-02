import React, { Fragment, useState } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1,
  });

  return (
    <Fragment>
      <CheckoutSummary ingredients={ingredients}></CheckoutSummary>
    </Fragment>
  );
};

export default Checkout;
