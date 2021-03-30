import React from "react";
import styled from "styled-components";
import Logo from "../../Logo/Logo";
import ToggleButton from "../Sidedrawer/ToggleButton";

import NavigationItems from "../NavigationItems/NavigationItems";

const ToolbarHeader = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #703b09;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
`;

const NewNav = styled.nav`
  height: 100%;

  @media (max-width: 499px) {
    display: none;
  }
`;

const Toolbar = (props) => {
  return (
    <ToolbarHeader>
      <ToggleButton clicked={props.clicked} />
      <Logo className="Toolbar" />
      <NewNav>
        <NavigationItems />
      </NewNav>
    </ToolbarHeader>
  );
};

export default Toolbar;
