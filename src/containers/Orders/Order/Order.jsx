import React from "react";
import styled from "styled-components";

const OrdersDiv = styled.div`
  width: 80%;
  border: 1px solid #eee;
  padding: 10px
  margin: 10px auto;
  box-shadow: 0 2px 3px #ccc;
  box-sizing: border-box;
`;

const Order = (props) => {
  const ingredients = Object.entries(props.ingredients).map(([key, value]) => {
    return { name: key, amount: value };
  });

  const ingredientOutput = ingredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ingredient.name} : {ingredient.amount}
      </span>
    );
  });

  return (
    <OrdersDiv>
      <p>Ingredients: {ingredientOutput} </p>
      <p>
        Price : <strong>{props.price}</strong>
      </p>
    </OrdersDiv>
  );
};

export default Order;
