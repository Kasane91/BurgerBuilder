import React from "react";
import styled from "styled-components";

const OrdersDiv = styled.div`
  width: 100%;
  border: 1px solid #eee;
  padding: 10px
  margin: 10px auto;
  box-shadow: 0 2px 3px #ccc;
  box-sizing: border-box;
`;

const Order = (props) => {
  return (
    <OrdersDiv>
      <p>Ingredients: Salad (1)</p>
      <p>
        Price : <strong>USD 5.45</strong>
      </p>
    </OrdersDiv>
  );
};

export default Order;
