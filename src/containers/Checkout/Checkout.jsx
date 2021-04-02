import React, { Fragment, useState, useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    let burgerIngredients = {};
    for (let instance of query.entries()) {
      burgerIngredients[instance[0]] = instance[1];
    }
    setIngredients(burgerIngredients);
  }, []);

  const onCheckoutCancel = () => {
    props.history.goBack();
  };

  const onCheckoutPurchase = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <Fragment>
      <CheckoutSummary
        onCheckoutCancel={onCheckoutCancel}
        onCheckoutPurchase={onCheckoutPurchase}
        ingredients={ingredients}
      ></CheckoutSummary>
    </Fragment>
  );
};

export default Checkout;
