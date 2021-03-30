import React, { Fragment } from "react";
import styled from "styled-components";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/Sidedrawer/Sidedrawer";

const StyledMain = styled.main`
  margin-top: 72px;
`;

const Layout = (props) => {
  return (
    <Fragment>
      <Toolbar />
      <SideDrawer />
      <StyledMain>{props.children}</StyledMain>
    </Fragment>
  );
};

export default Layout;
