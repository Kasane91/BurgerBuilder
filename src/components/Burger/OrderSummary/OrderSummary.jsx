import React from "react";
import styled from "styled-components";
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
        <p>Continue to checkout?</p>
        <CheckoutButton clicked={props.clicked} type="danger">
          CANCEL
        </CheckoutButton>
        <CheckoutButton clicked={props.clicked} type="">
          CONTINUE
        </CheckoutButton>
      </div>
    </div>
  );
};

export default OrderSummary;
