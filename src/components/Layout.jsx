import React, { Fragment } from "react";
import styled from "styled-components";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";

const StyledMain = styled.main`
  margin-top: 72px;
`;

const Layout = (props) => {
  return (
    <Fragment>
      <Toolbar />
      <StyledMain>{props.children}</StyledMain>
    </Fragment>
  );
};

export default Layout;
