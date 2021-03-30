import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import styled from "styled-components";

const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;

  @media (min-width: 500px) {
    flex-flow: row;
  }
`;

const NavigationItems = (props) => {
  return (
    <NavigationList>
      <NavigationItem link="/" className="active">
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </NavigationList>
  );
};
export default NavigationItems;
