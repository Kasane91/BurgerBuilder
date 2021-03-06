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
  &.danger {
    color: #944317;
  }
  &.primary {
    color: #5c9210;
  }
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const CheckoutButton = (props) => {
  return (
    <StyledButton
      disabled={props.disabled}
      className={props.type}
      onClick={props.clicked}
    >
      {props.children}
    </StyledButton>
  );
};

export default CheckoutButton;
