import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;
  color: ${(props) => {
    if (props.type === "danger") {
      return "#944317";
    } else {
      return "#5C9210";
    }
  }};
`;

const CheckoutButton = (props) => {
  return (
    <StyledButton type={props.type} onClick={props.clicked}>
      {props.children}
    </StyledButton>
  );
};

export default CheckoutButton;
