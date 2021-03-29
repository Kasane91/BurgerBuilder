import React from "react";

const OrderSummary = (props) => {
  const ingredientList = Object.keys(props.ingredients).map((ingredient) => {
    return (
      <li style={{ textTransform: "capitalize" }}>
        {ingredient} : {props.ingredients[ingredient]}
      </li>
    );
  });
  return (
    <div>
      <h3>Your Order</h3>
      <ul>{ingredientList}</ul>
      <p>Continue to checkout?</p>
    </div>
  );
};

export default OrderSummary;
