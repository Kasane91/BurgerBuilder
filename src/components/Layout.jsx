import React, { Fragment } from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  margin-top: 16px;
`;

const Layout = (props) => {
  return (
    <Fragment>
      <div> Toolbar, Sidebar, Backdrop</div>
      <StyledMain>{props.children}</StyledMain>
    </Fragment>
  );
};

export default Layout;
