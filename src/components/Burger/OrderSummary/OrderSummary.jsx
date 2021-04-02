import React from "react";

import CheckoutButton from "../../UI/Buttons/Button";

const OrderSummary = (props) => {
  const ingredientList = Object.keys(props.ingredients).map((ingredient) => {
    return (
      <li key={ingredient} style={{ textTransform: "capitalize" }}>
        {ingredient} : {props.ingredients[ingredient]}
      </li>
    );
  });
  return (
    <div>
      <h3>Your Order</h3>
      <ul>{ingredientList}</ul>
      <div>
        <p>
          <strong>Total price: $ {props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <CheckoutButton clicked={props.clickedCancel} type="danger">
          CANCEL
        </CheckoutButton>
        <CheckoutButton clicked={props.clickedContinue} type="primary">
          CONTINUE
        </CheckoutButton>
      </div>
    </div>
  );
};

export default OrderSummary;
