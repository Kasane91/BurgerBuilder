import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Buttons/Button";
import styled from "styled-components";

const CheckoutSummmary = (props) => {
  const CheckoutDiv = styled.div`
    text-align: center;
    width: 80%;
    margin: auto;

    @media (min-width: 600px) {
      width: 100%;
    }
  `;
  return (
    <CheckoutDiv>
      <h1>We hope it tastes good</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked type="danger">
        CANCEL
      </Button>
      <Button clicked type="primary">
        CONTINUE
      </Button>
    </CheckoutDiv>
  );
};

export default CheckoutSummmary;
