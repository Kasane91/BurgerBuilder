import React, { Fragment, useState, useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    let burgerIngredients = {};

    for (let instance of query.entries()) {
      if (instance[0] === "totalPrice") {
        setPrice(instance[1]);
      } else {
        burgerIngredients[instance[0]] = Number(instance[1]);
      }
    }
    setIngredients(burgerIngredients);
    console.log(burgerIngredients);
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
      <Route
        path={props.match.path + "/contact-data"}
        render={(props) => (
          <ContactData
            ingredients={ingredients}
            totalPrice={price}
            {...props}
          />
        )}
      />
    </Fragment>
  );
};

export default Checkout;
