import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;

  &:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }
`;

const CheckoutButton = (props) => {
  return (
    <StyledButton onClick={props.handleClick}>{props.children}</StyledButton>
  );
};

export default CheckoutButton;
