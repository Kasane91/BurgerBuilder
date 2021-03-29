import React from "react";

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
      <p>Continue to checkout?</p>
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </div>
  );
};

export default OrderSummary;
