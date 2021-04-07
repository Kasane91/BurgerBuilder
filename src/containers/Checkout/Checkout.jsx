import React, { Fragment } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

const Checkout = (props) => {
  const onCheckoutCancel = () => {
    props.history.goBack();
  };

  const onCheckoutPurchase = () => {
    props.history.replace("/checkout/contact-data");
  };

  let Summary = <Redirect to="/" />;
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    Summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          onCheckoutCancel={onCheckoutCancel}
          onCheckoutPurchase={onCheckoutPurchase}
          ingredients={props.ingredients}
        ></CheckoutSummary>
        <Route
          path={props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={props.ingredients}
              totalPrice={props.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }

  return <Fragment>{Summary}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
