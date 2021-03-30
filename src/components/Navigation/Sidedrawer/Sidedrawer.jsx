import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styled from "styled-components";

//POSSIBLE STYLE FAULT. NO NAVBAR STYLING? CHECKOUT TOOLBAR.JSX

const SideDrawerDiv = styled.div`
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: white;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;

  @media (min-width: 500px) {
    display: none;
  }

  &.Open {
    transform: translateX(0);
  }

  &.Close {
    transform: translateX(-100%);
  }
`;

const SideDrawer = (props) => {
  return (
    <SideDrawerDiv>
      <Logo className="SideDrawer" />
      <nav>
        <NavigationItems></NavigationItems>
      </nav>
    </SideDrawerDiv>
  );
};

export default SideDrawer;
